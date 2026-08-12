import { Resend } from "resend";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: any, res: any) {
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

    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || "onebar.help@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "OneBar <onboarding@resend.dev>";

    // If Resend API Key is not set yet in environment, return simulated success with notice
    if (!apiKey || apiKey.trim().length === 0) {
      console.log(`[ONEBAR CONTACT FORM SIMULATED SUBMISSION]`);
      console.log(`Name: ${cleanName}`);
      console.log(`Email: ${cleanEmail}`);
      console.log(`Company: ${cleanCompany}`);
      console.log(`Inquiry: ${cleanInquiry}`);
      console.log(`Message: ${cleanMessage}`);
      console.log(`Timestamp: ${timestamp}`);

      return res.status(200).json({
        success: true,
        simulated: true,
        message: "Message processed cleanly. Configure RESEND_API_KEY in Vercel to dispatch live emails.",
      });
    }

    // Send Live Email via Resend
    const resend = new Resend(apiKey);
    const subjectLine = `[ONEBAR CONTACT] ${cleanInquiry} — ${cleanName}`;

    const textContent = `New message received through onebar.in\n\nName:\n${cleanName}\n\nEmail:\n${cleanEmail}\n\nCompany / Organisation:\n${cleanCompany}\n\nInquiry Type:\n${cleanInquiry}\n\nMessage:\n${cleanMessage}\n\nSubmitted:\n${timestamp}\n\nWebsite:\nonebar.in`;

    const response = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      replyTo: cleanEmail,
      subject: subjectLine,
      text: textContent,
    });

    if (response.error) {
      console.error("[ONEBAR RESEND API ERROR]", response.error);
      return res.status(500).json({
        error: "Unable to deliver message right now. Please try again or email us directly at onebar.help@gmail.com.",
      });
    }

    return res.status(200).json({
      success: true,
      id: response.data?.id,
    });
  } catch (error: any) {
    console.error("[ONEBAR CONTACT API SERVER EXCEPTION]", error);
    return res.status(500).json({
      error: "An unexpected error occurred while delivering your message. Please try again or email us directly at onebar.help@gmail.com.",
    });
  }
}
