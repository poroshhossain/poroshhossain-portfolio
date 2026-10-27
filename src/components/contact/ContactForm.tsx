"use client";

import { SendHorizonal } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import { submitContact } from "@/actions/contact";
import { contactLimits } from "@/lib/contact";
import type { ContactFormState } from "@/lib/types";

const initialState: ContactFormState = { status: "idle" };

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted/60 focus:border-accent disabled:opacity-60";

/**
 * Accessible contact form. Client-side constraint validation (required,
 * min/max length, email type) covers quick feedback; all rules are
 * re-validated server-side in the action.
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Clear the form after a confirmed send.
  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="card h-fit p-6"
      aria-label="Contact form"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-sm font-medium"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            minLength={contactLimits.name.min}
            maxLength={contactLimits.name.max}
            autoComplete="name"
            aria-invalid={state.fieldErrors?.name ? "true" : undefined}
            aria-describedby={
              state.fieldErrors?.name ? "contact-name-error" : undefined
            }
            className={inputClass}
            placeholder="Your name"
          />
          {state.fieldErrors?.name ? (
            <p
              id="contact-name-error"
              role="alert"
              className="mt-1.5 text-xs text-red-600 dark:text-red-400"
            >
              {state.fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-sm font-medium"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={contactLimits.email.max}
            autoComplete="email"
            aria-invalid={state.fieldErrors?.email ? "true" : undefined}
            aria-describedby={
              state.fieldErrors?.email ? "contact-email-error" : undefined
            }
            className={inputClass}
            placeholder="you@company.com"
          />
          {state.fieldErrors?.email ? (
            <p
              id="contact-email-error"
              role="alert"
              className="mt-1.5 text-xs text-red-600 dark:text-red-400"
            >
              {state.fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="contact-subject"
            className="mb-1.5 block text-sm font-medium"
          >
            Subject
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            required
            minLength={contactLimits.subject.min}
            maxLength={contactLimits.subject.max}
            aria-invalid={state.fieldErrors?.subject ? "true" : undefined}
            aria-describedby={
              state.fieldErrors?.subject ? "contact-subject-error" : undefined
            }
            className={inputClass}
            placeholder="What's this about?"
          />
          {state.fieldErrors?.subject ? (
            <p
              id="contact-subject-error"
              role="alert"
              className="mt-1.5 text-xs text-red-600 dark:text-red-400"
            >
              {state.fieldErrors.subject}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="contact-message"
            className="mb-1.5 block text-sm font-medium"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={contactLimits.message.min}
            maxLength={contactLimits.message.max}
            rows={5}
            aria-invalid={state.fieldErrors?.message ? "true" : undefined}
            aria-describedby={
              state.fieldErrors?.message ? "contact-message-error" : undefined
            }
            className={`${inputClass} resize-y`}
            placeholder="A few lines about the role, project or idea…"
          />
          {state.fieldErrors?.message ? (
            <p
              id="contact-message-error"
              role="alert"
              className="mt-1.5 text-xs text-red-600 dark:text-red-400"
            >
              {state.fieldErrors.message}
            </p>
          ) : null}
        </div>
      </div>

      {/* Honeypot — visually hidden field real users never fill. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input
          type="text"
          id="contact-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Send message"}
        <SendHorizonal className="size-4" aria-hidden="true" />
      </button>

      {state.status !== "idle" && state.message ? (
        <p
          aria-live="assertive"
          role={state.status === "success" ? "status" : "alert"}
          className={`mt-4 rounded-lg border px-3.5 py-3 text-sm ${
            state.status === "success"
              ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300"
          }`}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
