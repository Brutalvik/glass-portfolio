"use client";

import type { FormEvent } from "react";

import { useState } from "react";

import { profile } from "@/config/resume";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Posts to /api/contact, which emails me through Nodemailer and sends the
 * visitor a confirmation. SMTP settings live in server environment variables.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<
      string,
      string
    >;

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setError(json.error ?? "Something went wrong.");
        setStatus("error");

        return;
      }

      setSentTo(data.email);
      setStatus("sent");
      form.reset();
    } catch {
      setError("Network error.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div
        aria-live="polite"
        className="flex flex-col justify-center rounded-3xl bg-ink/5 p-8 text-center"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
          <svg
            aria-hidden
            fill="none"
            height="22"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.4"
            viewBox="0 0 24 24"
            width="22"
          >
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>
        <p className="mt-4 text-xl font-semibold text-ink">Message sent.</p>
        <p className="mt-2 text-ink/70">
          A confirmation is on its way to{" "}
          <span className="font-medium text-ink">{sentTo}</span>. I&apos;ll
          reply within one business day.
        </p>
        <button
          className="mx-auto mt-6 rounded-full bg-ink/10 px-4 py-2 text-[13px] font-medium text-ink transition hover:bg-ink/15"
          type="button"
          onClick={() => setStatus("idle")}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor="cf-name">
        Name
      </label>
      <input
        required
        autoComplete="name"
        className="field"
        id="cf-name"
        maxLength={100}
        name="name"
        placeholder="Your name"
      />
      <label className="sr-only" htmlFor="cf-email">
        Email
      </label>
      <input
        required
        autoComplete="email"
        className="field"
        id="cf-email"
        maxLength={200}
        name="email"
        placeholder="you@company.com"
        type="email"
      />
      <label className="sr-only" htmlFor="cf-message">
        Message
      </label>
      <textarea
        required
        className="field min-h-36 resize-y"
        id="cf-message"
        maxLength={5000}
        minLength={10}
        name="message"
        placeholder="What are you working on?"
      />
      {/* Honeypot, hidden from people and screen readers */}
      <div
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="cf-company">Company</label>
        <input
          autoComplete="off"
          id="cf-company"
          name="company"
          tabIndex={-1}
        />
      </div>
      <button
        className="mt-1 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-paper transition hover:opacity-85 disabled:opacity-60"
        disabled={status === "sending"}
        type="submit"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
      <p aria-live="polite" className="min-h-5 text-[13px] text-ink/70">
        {status === "error" && (
          <>
            {error} You can also email me at{" "}
            <a className="underline" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
