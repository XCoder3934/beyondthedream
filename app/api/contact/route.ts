import { NextResponse } from "next/server";

const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 40;
const MAX_MESSAGE_LENGTH = 5000;
const DEFAULT_NOTIFICATION_RECIPIENT = "beyondthedream.information@gmail.com";

function isString(value: unknown): value is string {
  return typeof value === "string";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const name = isString(input.name) ? input.name.trim() : "";
  const email = isString(input.email) ? input.email.trim() : "";
  const phone = isString(input.phone) ? input.phone.trim() : "";
  const message = isString(input.message) ? input.message.trim() : "";

  if (
    !name || name.length > MAX_NAME_LENGTH ||
    !email || email.length > MAX_EMAIL_LENGTH || !/^\S+@\S+\.\S+$/.test(email) ||
    phone.length > MAX_PHONE_LENGTH ||
    !message || message.length > MAX_MESSAGE_LENGTH
  ) {
    return NextResponse.json({ error: "Please check your message details." }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) {
    return NextResponse.json({ error: "Contact service is not configured." }, { status: 503 });
  }

  try {
    const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/contact_submissions`, {
      method: "POST",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name,
        email,
        phone: phone || null,
        message,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { code: "contact_upstream_rejected", upstreamStatus: response.status },
        { status: 502 },
      );
    }
  } catch (error) {
    const cause = error instanceof Error && "cause" in error ? error.cause : undefined;
    console.error(
      "Contact submission request failed:",
      cause instanceof Error ? cause.message : error instanceof Error ? error.message : "Unknown error",
    );
    return NextResponse.json({ code: "contact_service_unreachable" }, { status: 503 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const notificationFrom = process.env.CONTACT_NOTIFICATION_FROM;
  const notificationTo = process.env.CONTACT_NOTIFICATION_TO || DEFAULT_NOTIFICATION_RECIPIENT;

  if (!resendApiKey || !notificationFrom) {
    console.warn("Contact submission was saved, but email notifications are not configured.");
  } else {
    try {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: notificationFrom,
          to: [notificationTo],
          reply_to: email,
          subject: "Yeni iletişim mesajı | Beyond the Dream",
          text: [
            `İsim: ${name}`,
            `E-posta: ${email}`,
            `Telefon: ${phone || "Belirtilmedi"}`,
            "",
            "Mesaj:",
            message,
          ].join("\n"),
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      });

      if (!emailResponse.ok) {
        console.error("Contact notification email failed with status:", emailResponse.status);
      }
    } catch {
      console.error("Contact notification email request failed.");
    }
  }

  return NextResponse.json({ ok: true });
}
