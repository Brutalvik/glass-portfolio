import { NextResponse } from "next/server";
import { z } from "zod";

import { getTransporter } from "@/lib/email/mailer";
import { autoReply, notification } from "@/lib/email/templates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(200),
  message: z.string().trim().min(10, "Please write a little more").max(5000),
  // Honeypot: real visitors never fill this hidden field
  company: z.string().max(0).optional().or(z.literal("")),
});

// Best-effort rate limit: 5 messages per IP per 10 minutes.
// In-memory, so it resets per serverless instance; enough to stop casual abuse.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

const limited = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  recent.push(now);
  hits.set(ip, recent);

  return recent.length > LIMIT;
};

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (limited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    const first = parsed.error.issues[0];

    // Honeypot hit: pretend success so bots learn nothing
    if (first?.path[0] === "company") return NextResponse.json({ ok: true });

    return NextResponse.json(
      { error: first?.message ?? "Invalid input." },
      { status: 400 },
    );
  }

  const mail = getTransporter();

  if (!mail) {
    return NextResponse.json(
      { error: "Email is not configured yet." },
      { status: 503 },
    );
  }

  const { name, email, message } = parsed.data;
  const msg = { name, email, message };
  const note = notification(msg, { receivedAt: new Date() });
  const reply = autoReply(msg);

  try {
    // Notify me first; only confirm to the sender once that succeeds
    await mail.transporter.sendMail({
      from: mail.from,
      to: mail.to,
      replyTo: { name, address: email },
      subject: note.subject,
      html: note.html,
      text: note.text,
    });

    await mail.transporter.sendMail({
      from: mail.from,
      to: { name, address: email },
      replyTo: mail.to,
      subject: reply.subject,
      html: reply.html,
      text: reply.text,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("contact: send failed", err);

    return NextResponse.json(
      { error: "Could not send right now." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
