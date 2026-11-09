import { NextResponse } from "next/server";
import { z } from "zod";

import { getMailer } from "@/lib/email/mailer";
import { autoReply, notification } from "@/lib/email/templates";
import { isRateLimited } from "@/lib/security/rate-limit";
import { verifyTurnstile } from "@/lib/security/turnstile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(200),
  message: z.string().trim().min(10, "Please write a little more").max(5000),
  // Honeypot: real visitors never fill this hidden field
  company: z.string().max(0).optional().or(z.literal("")),
  // Cloudflare Turnstile token (field name set by the widget)
  "cf-turnstile-response": z.string().max(4096).optional(),
});

const fail = (error: string, status: number) =>
  NextResponse.json({ error }, { status });

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (await isRateLimited(`ip:${ip}`)) {
    return fail("Too many messages. Please try again later.", 429);
  }

  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return fail("Invalid request.", 400);
  }

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    const first = parsed.error.issues[0];

    // Honeypot hit: pretend success so bots learn nothing
    if (first?.path[0] === "company") return NextResponse.json({ ok: true });

    return fail(first?.message ?? "Invalid input.", 400);
  }

  if (!(await verifyTurnstile(parsed.data["cf-turnstile-response"], ip))) {
    return fail("Verification failed. Please refresh and try again.", 400);
  }

  const mail = getMailer();

  if (!mail) return fail("Email is not configured yet.", 503);

  const { name, email, message } = parsed.data;
  const msg = { name, email, message };
  const receivedAt = new Date();
  const note = notification(msg, { receivedAt });
  const reply = autoReply(msg, { receivedAt });

  try {
    // Notify me first; only confirm to the sender once that succeeds
    await mail.send({
      to: mail.to,
      replyTo: { name, address: email },
      ...note,
    });
    await mail.send({
      to: { name, address: email },
      replyTo: mail.to,
      ...reply,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`contact: send failed via ${mail.provider}`, err);

    return fail("Could not send right now.", 502);
  }

  return NextResponse.json({ ok: true });
}
