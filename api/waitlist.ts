import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

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
      text: `Hi,

Thank you for your interest in OneBar. You are now part of the OneBar waitlist!

We are currently researching and developing our next-generation digital payment infrastructure. We will notify you as soon as closed pilot trials or testing opportunities open up in your area.

In the meantime, feel free to visit our website to keep up with the project.

Best regards,
The OneBar Team
https://onebar.in`,
    };

    // 6. Send Internal Notification Email to onebar.help@gmail.com
    const internalMailOptions = {
      from: `OneBar <${gmailUser}>`,
      to: "onebar.help@gmail.com",
      subject: "New OneBar Waitlist Signup",
      text: `A new user has joined the OneBar waitlist.\n\nUser Email:\n${cleanEmail}\n\nSignup Timestamp:\n${timestamp}\n\nWebsite:\nonebar.in`,
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
