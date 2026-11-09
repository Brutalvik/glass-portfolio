import nodemailer, { Transporter } from "nodemailer";

import { profile } from "@/config/resume";

/**
 * SMTP settings come from environment variables (see .env.example).
 * For Gmail: SMTP_HOST=smtp.gmail.com, SMTP_PORT=465, and an App Password
 * (Google Account > Security > 2-Step Verification > App passwords) as SMTP_PASS.
 */
export function mailConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT ?? 465);

  return {
    transport: {
      host,
      port,
      secure: process.env.SMTP_SECURE
        ? process.env.SMTP_SECURE === "true"
        : port === 465,
      auth: { user, pass },
    },
    /** Display name + address the emails come from; must be allowed by the SMTP account */
    from: process.env.MAIL_FROM ?? `${profile.name} <${user}>`,
    /** Where new-message notifications go */
    to: process.env.CONTACT_TO ?? profile.email,
  };
}

let cached: Transporter | null = null;

export function getTransporter() {
  const cfg = mailConfig();

  if (!cfg) return null;
  cached ??= nodemailer.createTransport(cfg.transport);

  return { transporter: cached, ...cfg };
}
