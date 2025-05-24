import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with API key from environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

// Test the email connection on server start
if (process.env.NODE_ENV === "development") {
  resend.emails
    .send({
      from: "Bishal Sherpa <onboarding@resend.dev>",
      to: process.env.NEXT_PUBLIC_CONTACT_EMAIL!,
      subject: "Email Service Test",
      html: "<p>Your email service is working!</p>",
    })
    .then(() => {
      console.log("✅ Email service test successful");
    })
    .catch((error) => {
      console.error("❌ Email service test failed:", error);
    });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: process.env.NEXT_PUBLIC_CONTACT_EMAIL!,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h3>New Contact Form Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
