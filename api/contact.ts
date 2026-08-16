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
    const { name, email, company, inquiryType, message, hp } = req.body || {};

    // Anti-spam Honeypot Check: silently ignore if honeypot is filled
    if (hp && String(hp).trim().length > 0) {
      return res.status(200).json({ success: true, note: "Message processed." });
    }

    // Input Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({ error: "Full Name is required (minimum 2 characters)." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return res.status(400).json({ error: "A valid email address is required." });
    }

    if (!inquiryType || typeof inquiryType !== "string") {
      return res.status(400).json({ error: "Inquiry Type selection is required." });
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return res.status(400).json({ error: "Message content is required (minimum 10 characters)." });
    }

    if (message.trim().length > 3000) {
      return res.status(400).json({ error: "Message exceeds maximum allowed length of 3000 characters." });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanCompany = company && typeof company === "string" ? company.trim() : "Not specified";
    const cleanInquiry = inquiryType.trim();
    const cleanMessage = message.trim();
    const timestamp = new Date().toUTCString();

    // Supabase config
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("[ONEBAR CONTACT ERROR] Supabase credentials are not configured.");
      return res.status(500).json({
        error: "Server configuration error. Please contact onebar.help@gmail.com directly.",
      });
    }

    // SMTP Config
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      console.error("[ONEBAR CONTACT ERROR] Gmail SMTP credentials are not configured.");
      return res.status(500).json({
        error: "Server configuration error. Please contact onebar.help@gmail.com directly.",
      });
    }

    // 1. Store in Supabase contact_submissions
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert([
        {
          name: cleanName,
          email: cleanEmail,
          company: cleanCompany,
          inquiry_type: cleanInquiry,
          message: cleanMessage,
        },
      ]);

    if (dbError) {
      console.error("[ONEBAR CONTACT DATABASE ERROR]", dbError);
      return res.status(500).json({
        error: "Unable to save your message. Please try again or email us directly at onebar.help@gmail.com.",
      });
    }

    // 2. Setup Nodemailer Transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    // 3. Send Internal Notification Email to onebar.help@gmail.com
    const internalMailOptions = {
      from: `OneBar <${gmailUser}>`,
      to: "onebar.help@gmail.com",
      replyTo: cleanEmail,
      subject: "New Contact Form Submission — OneBar",
      text: `New message received through onebar.in\n\nName:\n${cleanName}\n\nEmail:\n${cleanEmail}\n\nCompany / Organisation:\n${cleanCompany}\n\nInquiry Type:\n${cleanInquiry}\n\nMessage:\n${cleanMessage}\n\nSubmitted:\n${timestamp}\n\nWebsite:\nonebar.in`,
    };

    // 4. Send Confirmation Email to the user
    const confirmationMailOptions = {
      from: `OneBar <${gmailUser}>`,
      to: cleanEmail,
      subject: "We received your message — OneBar",
      text: `Hi ${cleanName},

Thank you for reaching out to OneBar. We have received your message regarding "${cleanInquiry}".

OneBar is currently in the R&D stage, and we appreciate you taking the time to share your thoughts with us. Our team reviews all incoming inquiries and will follow up if there is alignment.

Best regards,
The OneBar Team
https://onebar.in`,
    };

    // Run mail sending tasks in parallel
    const [internalRes, confirmationRes] = await Promise.allSettled([
      transporter.sendMail(internalMailOptions),
      transporter.sendMail(confirmationMailOptions),
    ]);

    // Log errors if email sending fails
    if (internalRes.status === "rejected") {
      console.error("[ONEBAR SMTP ERROR] Failed to send internal notification:", internalRes.reason);
      return res.status(500).json({
        error: "Failed to dispatch notification email. Please email us directly at onebar.help@gmail.com.",
      });
    }

    if (confirmationRes.status === "rejected") {
      console.error("[ONEBAR SMTP ERROR] Failed to send confirmation email:", confirmationRes.reason);
      // We do not fail the request if user confirmation fails but the internal notification succeeds.
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error: any) {
    console.error("[ONEBAR CONTACT API SERVER EXCEPTION]", error);
    return res.status(500).json({
      error: "An unexpected error occurred while delivering your message. Please try again or email us directly at onebar.help@gmail.com.",
    });
  }
}