import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";
import path from "path";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { email } = req.body || {};

    // Validate email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return res.status(400).json({ error: "A valid email address is required." });
    }

    const cleanEmail = email.trim();
    const timestamp = new Date().toUTCString();

    // Supabase config
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("[ONEBAR WAITLIST ERROR] Supabase credentials are not configured.");
      return res.status(500).json({
        error: "Server configuration error. Please contact onebar.help@gmail.com directly.",
      });
    }

    // SMTP Config
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      console.error("[ONEBAR WAITLIST ERROR] Gmail SMTP credentials are not configured.");
      return res.status(500).json({
        error: "Server configuration error. Please contact onebar.help@gmail.com directly.",
      });
    }

    // 1. Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 2. Prevent duplicate registrations
    const { data: existingEntry, error: checkError } = await supabase
      .from("waitlist")
      .select("email")
      .eq("email", cleanEmail)
      .maybeSingle();

    if (checkError) {
      console.error("[ONEBAR WAITLIST DATABASE CHECK ERROR]", checkError);
      return res.status(500).json({
        error: "Database lookup failed. Please try again or email us directly at onebar.help@gmail.com.",
      });
    }

    if (existingEntry) {
      // Graceful success response indicating they are already registered
      return res.status(200).json({
        success: true,
        message: "You're already on the OneBar waitlist.",
      });
    }

    // 3. Store new waitlist registration
    const { error: insertError } = await supabase
      .from("waitlist")
      .insert([{ email: cleanEmail }]);

    if (insertError) {
      console.error("[ONEBAR WAITLIST DATABASE INSERT ERROR]", insertError);
      // Double check in case of unique key race condition
      if (insertError.code === "23505") {
        return res.status(200).json({
          success: true,
          message: "You're already on the OneBar waitlist.",
        });
      }
      return res.status(500).json({
        error: "Unable to save your email. Please try again or email us directly at onebar.help@gmail.com.",
      });
    }

    // 4. Setup Nodemailer Transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    // 5. Send Welcome Email to the user
    const welcomeMailOptions = {
      from: `OneBar <${gmailUser}>`,
      to: cleanEmail,
      subject: "Welcome to OneBar",
      text: `Hi,\n\nThank you for your interest in OneBar. You are now part of the OneBar waitlist!\n\nWe are currently researching and developing our next-generation digital payment infrastructure. We will notify you as soon as closed pilot trials or testing opportunities open up in your area.\n\nIn the meantime, feel free to visit our website to keep up with the project.\n\nBest regards,\nThe OneBar Team\nhttps://onebar-in.vercel.app`,
      html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9f9fb; padding: 40px 20px; color: #1e1e24;">
  <div style="max-width: 540px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eef0f3; border-radius: 16px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
    <div style="text-align: center; margin-bottom: 30px;">
      <img src="cid:logo@onebar-in.vercel.app" width="56" height="56" alt="OneBar Logo" style="width: 56px; height: 56px; border-radius: 50%; object-fit: cover;" />
      <div style="font-size: 20px; font-weight: 700; color: #1a1a1a; margin-top: 15px; margin-bottom: 5px;">Welcome to the Waitlist</div>
      <div style="font-size: 12px; font-family: monospace; color: #7c3aed;">onebar-in.vercel.app</div>
    </div>
    <div style="font-size: 15px; line-height: 1.6; color: #4a4a50;">
      <p>Hi,</p>
      <p>Thank you for your interest in OneBar. You are now officially on the OneBar waitlist!</p>
      <p>We are currently researching and developing our next-generation, offline-resilient digital payment infrastructure. We will notify you as soon as closed pilot trials or testing opportunities open up in your area.</p>
      <p>In the meantime, feel free to visit our website to follow our progress.</p>
      <p style="margin-top: 30px;">Best regards,<br /><strong style="color: #1a1a1a;">The OneBar Team</strong></p>
    </div>
    <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #f0f0f5; font-size: 12px; color: #9999a3;">
      Visit our website at <a href="https://onebar-in.vercel.app" style="color: #7c3aed; text-decoration: none;">onebar-in.vercel.app</a>
    </div>
  </div>
</div>`,
      attachments: [
        {
          filename: "logo.jpg",
          path: path.join(process.cwd(), "api", "logo.jpg"),
          cid: "logo@onebar-in.vercel.app",
          contentType: "image/jpeg",
          disposition: "inline"
        }
      ]
    };

    // 6. Send Internal Notification Email to onebar.help@gmail.com
    const internalMailOptions = {
      from: `OneBar <${gmailUser}>`,
      to: "onebar.help@gmail.com",
      subject: "New OneBar Waitlist Signup",
      text: `A new user has joined the OneBar waitlist.\n\nUser Email:\n${cleanEmail}\n\nSignup Timestamp:\n${timestamp}\n\nWebsite:\nonebar-in.vercel.app`,
      html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9f9fb; padding: 40px 20px; color: #1e1e24;">
  <div style="max-width: 540px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eef0f3; border-radius: 16px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
    <div style="text-align: center; margin-bottom: 30px;">
      <img src="cid:logo@onebar-in.vercel.app" width="56" height="56" alt="OneBar Logo" style="width: 56px; height: 56px; border-radius: 50%; object-fit: cover;" />
      <div style="font-size: 20px; font-weight: 700; color: #1a1a1a; margin-top: 15px; margin-bottom: 5px;">New Waitlist Signup</div>
      <div style="font-size: 12px; font-family: monospace; color: #7c3aed;">onebar-in.vercel.app</div>
    </div>
    <div style="font-size: 14px; line-height: 1.6; color: #4a4a50;">
      <div style="font-weight: 600; color: #7c3aed; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 20px; margin-bottom: 4px;">User Email</div>
      <div style="background-color: #f4f4f7; padding: 12px 16px; border-radius: 8px; color: #2e2e33; margin-bottom: 15px;">${cleanEmail}</div>

      <div style="font-weight: 600; color: #7c3aed; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 20px; margin-bottom: 4px;">Signup Timestamp</div>
      <div style="background-color: #f4f4f7; padding: 12px 16px; border-radius: 8px; color: #2e2e33; margin-bottom: 15px;">${timestamp}</div>
    </div>
    <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #f0f0f5; font-size: 12px; color: #9999a3;">
      This signup occurred on <a href="https://onebar-in.vercel.app" style="color: #7c3aed; text-decoration: none;">onebar-in.vercel.app</a>
    </div>
  </div>
</div>`,
      attachments: [
        {
          filename: "logo.jpg",
          path: path.join(process.cwd(), "api", "logo.jpg"),
          cid: "logo@onebar-in.vercel.app",
          contentType: "image/jpeg",
          disposition: "inline"
        }
      ]
    };

    // Run email sending tasks in parallel
    const [welcomeRes, internalRes] = await Promise.allSettled([
      transporter.sendMail(welcomeMailOptions),
      transporter.sendMail(internalMailOptions),
    ]);

    // Log errors if email sending fails
    if (welcomeRes.status === "rejected") {
      console.error("[ONEBAR SMTP ERROR] Failed to send welcome email:", welcomeRes.reason);
    }
    if (internalRes.status === "rejected") {
      console.error("[ONEBAR SMTP ERROR] Failed to send internal notification:", internalRes.reason);
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error: any) {
    console.error("[ONEBAR WAITLIST API SERVER EXCEPTION]", error);
    return res.status(500).json({
      error: "An unexpected error occurred. Please try again or email us directly at onebar.help@gmail.com.",
    });
  }
}
