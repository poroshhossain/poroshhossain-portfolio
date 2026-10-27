/** Pure validators shared by the contact form (client) and server action. */
import type { ContactField, ContactFormState } from "@/lib/types";

export const contactLimits = {
  name: { min: 2, max: 80 },
  email: { min: 5, max: 120 },
  subject: { min: 3, max: 120 },
  message: { min: 10, max: 2000 },
} as const;

const EMAIL_RE =
  // Practical subset of RFC 5322; enough for an input form.
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContactInput(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): { ok: true } | { ok: false; fieldErrors: ContactFormState["fieldErrors"] } {
  const fieldErrors: ContactFormState["fieldErrors"] = {};

  const name = input.name.trim();
  if (name.length < contactLimits.name.min) {
    fieldErrors.name = `Name must be at least ${contactLimits.name.min} characters.`;
  } else if (name.length > contactLimits.name.max) {
    fieldErrors.name = `Name must be at most ${contactLimits.name.max} characters.`;
  }

  const email = input.email.trim();
  if (!EMAIL_RE.test(email)) {
    fieldErrors.email = "Enter a valid email address.";
  } else if (email.length > contactLimits.email.max) {
    fieldErrors.email = `Email must be at most ${contactLimits.email.max} characters.`;
  }

  const subject = input.subject.trim();
  if (subject.length < contactLimits.subject.min) {
    fieldErrors.subject = `Subject must be at least ${contactLimits.subject.min} characters.`;
  } else if (subject.length > contactLimits.subject.max) {
    fieldErrors.subject = `Subject must be at most ${contactLimits.subject.max} characters.`;
  }

  const message = input.message.trim();
  if (message.length < contactLimits.message.min) {
    fieldErrors.message = `Message must be at least ${contactLimits.message.min} characters.`;
  } else if (message.length > contactLimits.message.max) {
    fieldErrors.message = `Message must be at most ${contactLimits.message.max} characters.`;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }
  return { ok: true };
}

export function readContactForm(
  formData: FormData,
): Record<ContactField | "honeypot", string> {
  const value = (key: string) => {
    const raw = formData.get(key);
    return typeof raw === "string" ? raw : "";
  };
  return {
    name: value("name"),
    email: value("email"),
    subject: value("subject"),
    message: value("message"),
    honeypot: value("company"),
  };
}
