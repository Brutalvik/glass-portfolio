import nodemailer, { Transporter } from "nodemailer";
import { Resend } from "resend";

import { profile } from "@/config/resume";

type Address = string | { name: string; address: string };

export type OutgoingMail = {
  to: Address;
  replyTo?: Address;
  subject: string;
  html: string;
  text: string;
};

export type Mailer = {
  provider: "resend" | "smtp";
  from: string;
  /** Where new-message notifications go */
  to: string;
  send: (mail: OutgoingMail) => Promise<void>;
};

const fmt = (a: Address) =>
  typeof a === "string" ? a : `${a.name} <${a.address}>`;

let cachedSmtp: Transporter | null = null;

/**
 * Picks an email provider from environment variables:
 *
 * 1. Resend (recommended): RESEND_API_KEY + MAIL_FROM on a verified domain,
 *    e.g. MAIL_FROM="Vikram Kumar <hello@yourdomain.com>". Best deliverability
 *    because the domain carries SPF and DKIM records.
 * 2. SMTP via Nodemailer: SMTP_HOST, SMTP_USER, SMTP_PASS (e.g. Gmail with an
 *    App Password).
 *
 * Returns null when neither is configured.
 */
export function getMailer(): Mailer | null {
  // Notification inbox. Never shipped to the browser; falls back to the SMTP login.
  const to = process.env.CONTACT_TO ?? process.env.SMTP_USER;

  if (!to) return null;

  if (process.env.RESEND_API_KEY && process.env.MAIL_FROM) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.MAIL_FROM;

    return {
      provider: "resend",
      from,
      to,
      send: async (m) => {
        const { error } = await resend.emails.send({
          from,
          to: fmt(m.to),
          replyTo: m.replyTo ? fmt(m.replyTo) : undefined,
          subject: m.subject,
          html: m.html,
          text: m.text,
        });

        if (error) throw new Error(`resend: ${error.name}: ${error.message}`);
      },
    };
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT ?? 465);
  const from = process.env.MAIL_FROM ?? `${profile.name} <${user}>`;

  cachedSmtp ??= nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : port === 465,
    auth: { user, pass },
  });

  const transporter = cachedSmtp;

  return {
    provider: "smtp",
    from,
    to,
    send: async (m) => {
      await transporter.sendMail({
        from,
        to: m.to,
        replyTo: m.replyTo,
        subject: m.subject,
        html: m.html,
        text: m.text,
      });
    },
  };
}
