"use client";

import type { FormEvent } from "react";

import { useState } from "react";

import { profile } from "@/config/resume";

/**
 * Sends through Formspree when NEXT_PUBLIC_FORMSPREE_ID is set
 * (create a free form at formspree.io and copy its ID, e.g. "xyzabcd").
 * Without it, the form opens the visitor's mail app with the message filled in.
 */
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get("_gotcha")) return; // honeypot

    if (!FORMSPREE_ID) {
      const subject = encodeURIComponent(
        `Portfolio enquiry from ${data.get("name")}`,
      );
      const body = encodeURIComponent(
        `${data.get("message")}\n\n${data.get("name")}\n${data.get("email")}`,
      );

      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div
        aria-live="polite"
        className="flex flex-col justify-center rounded-3xl bg-ink/5 p-8 text-center"
      >
        <p className="text-xl font-semibold text-ink">
          Thanks, message received.
        </p>
        <p className="mt-2 text-ink/70">I usually reply within a day.</p>
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
        name="message"
        placeholder="What are you working on?"
      />
      <input
        aria-hidden
        autoComplete="off"
        className="hidden"
        name="_gotcha"
        tabIndex={-1}
      />
      <button
        className="mt-1 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-paper transition hover:opacity-85 disabled:opacity-60"
        disabled={status === "sending"}
        type="submit"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
      <p aria-live="polite" className="min-h-5 text-[13px] text-ink/65">
        {status === "error" && (
          <>
            Something went wrong. Email me directly at{" "}
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
