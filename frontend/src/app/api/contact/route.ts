import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const typeOfWork =
    typeof body.typeOfWork === "string" && body.typeOfWork.trim()
      ? body.typeOfWork.trim().slice(0, 60)
      : "Something else";
  // Honeypot — real visitors never see or fill this field.
  const honeypot = typeof body.company === "string" ? body.company.trim() : "";

  if (honeypot) {
    return NextResponse.json({ message: "Message sent." });
  }

  if (!name || name.length > 200) {
    return NextResponse.json(
      { message: "Please enter your name." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (!message || message.length < 10 || message.length > 5000) {
    return NextResponse.json(
      {
        message:
          "Please share a few more details about what you're building.",
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.error(
      "[api/contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL env var.",
    );
    return NextResponse.json(
      {
        message:
          "The form can't send right now. Your message is still here, so you can send it by email instead.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);

  try {
    // onboarding@resend.dev only delivers to the Resend account owner's own
    // address until a custom domain is verified — swap the "from" once one is.
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `New inquiry from ${name} (${typeOfWork})`,
      text: `From: ${name} <${email}>\nType: ${typeOfWork}\n\n${message}`,
    });
  } catch (error) {
    console.error("[api/contact] Resend error:", error);
    return NextResponse.json(
      {
        message:
          "The form couldn't send your message. It's still here, so you can try again or send it by email instead.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Message sent." });
}
