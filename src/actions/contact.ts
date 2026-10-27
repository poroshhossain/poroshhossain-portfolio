"use server";

/**
 * Contact form submission.
 *
 * How to make the form functional (see README → "Contact form"):
 *   1. Create a Resend account (resend.com) and verify your email or domain.
 *   2. Set RESEND_API_KEY in the deployment environment.
 *   3. Optionally set CONTACT_TO_EMAIL (defaults to profile.email) and
 *      CONTACT_FROM (defaults to Resend's sandbox sender).
 * Until RESEND_API_KEY exists, the action validates input, rate-limits, and
 * then clearly reports that submissions are unavailable — it never fakes a
 * success for a real visitor.
 */
import { headers } from "next/headers";
import { profile } from "@/data/profile";
import { readContactForm, validateContactInput } from "@/lib/contact";
import { checkRateLimit } from "@/lib/rate-limit";
import type { ContactFormState } from "@/lib/types";

const RATE_LIMIT = { limit: 5, windowMs: 15 * 60 * 1000 };

async function clientKey(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for") ?? "";
  return forwarded.split(",")[0]?.trim() || "unknown-client";
}

async function sendViaResend(input: {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
}): Promise<{ ok: true } | { ok: false; reason: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, reason: "not_configured" };
  }
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: input.from,
      to: input.to,
      subject: input.subject,
      reply_to: input.replyTo,
      text: input.text,
    }),
  });
  if (response.ok) {
    return { ok: true };
  }
  const detail = await response.text().catch(() => "");
  console.error("Resend delivery failed:", response.status, detail);
  return { ok: false, reason: "delivery_failed" };
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const formDataRead = readContactForm(formData);

  // Honeypot: real users never fill the "company" field. Bots do — respond
  // like a success without doing anything so scrapers learn nothing.
  if (formDataRead.honeypot !== "") {
    return { status: "success" };
  }

  // Rate limit per client IP.
  const key = await clientKey();
  const rate = checkRateLimit(key, RATE_LIMIT);
  if (!rate.allowed) {
    return {
      status: "error",
      message: `Too many messages sent recently. Please try again in about ${Math.max(1, Math.ceil(rate.retryAfterSeconds / 60))} minutes, or email me directly.`,
    };
  }

  const validation = validateContactInput(formDataRead);
  if (!validation.ok) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors: validation.fieldErrors,
    };
  }

  const { name, email, subject, message } = formDataRead;
  const to = process.env.CONTACT_TO_EMAIL ?? profile.email;
  const from =
    process.env.CONTACT_FROM ?? "Portfolio Contact <onboarding@resend.dev>";

  const result = await sendViaResend({
    from,
    to,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
  });

  if (result.ok) {
    return {
      status: "success",
      message:
        "Thanks — your message is in my inbox. I'll reply as soon as I can.",
    };
  }

  if (result.reason === "not_configured") {
    return {
      status: "error",
      message: `The contact form isn't connected to an email service yet, so this message can't be delivered. Please email me directly at ${profile.email} or reach out on LinkedIn.`,
    };
  }

  return {
    status: "error",
    message: `Something went wrong while sending your message. Please email me directly at ${profile.email}.`,
  };
}
