import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { subject, message, recipient } = await req.json();

    if (!subject || !message) {
      return NextResponse.json({ message: "Subject and message are required" }, { status: 400 });
    }

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail", // Use your preferred email provider
      auth: {
        user: process.env.EMAIL_USER, // Sender email
        pass: process.env.EMAIL_PASS, // Email password or app-specific password
      },
    });

    console.log(process.env.EMAIL_USER)
    console.log(process.env.EMAIL_PASS)

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient || process.env.EMAIL_RECEIVER, // Use provided recipient or default
      subject: subject,
      text: message, // Plain text
      html: `<pre>${message}</pre>`, // HTML formatted message
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Failed to send email", error }, { status: 500 });
  }
}
