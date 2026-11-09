import { profile } from "@/config/resume";
import { siteConfig } from "@/config/site";

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

/* ------------------------------------------------------------------ *
 * Email-safe building blocks: table layout, inline styles, bgcolor
 * fallbacks for clients without gradient / background-image support.
 * ------------------------------------------------------------------ */

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const nl2br = (s: string) => esc(s).replace(/\r?\n/g, "<br>");

const FONT =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif";

const C = {
  page: "#eef0f5",
  ink: "#1d1d1f",
  sub: "#6e6e73",
  faint: "#86868b",
  line: "#e5e5ea",
  card: "#ffffff",
  tint: "#f5f6fa",
  blue: "#0071e3",
  green: "#30d158",
  night: "#0c0e18",
  night2: "#1a1f33",
  amber: "#ff9f0a",
  violet: "#5e5ce6",
};

const asset = (path: string) => `${siteConfig.url}${path}`;
const firstName = (name: string) => name.trim().split(/\s+/)[0] || "there";
const initial = (name: string) => (name.trim()[0] || "?").toUpperCase();

const button = (
  href: string,
  label: string,
  kind: "primary" | "ghost" = "primary",
) => {
  const styles =
    kind === "primary"
      ? `background:${C.blue};color:#ffffff;border:1px solid ${C.blue};`
      : `background:#ffffff;color:${C.blue};border:1px solid #c7d7f0;`;

  return `<a href="${href}" style="display:inline-block;${styles}border-radius:980px;padding:12px 22px;font-family:${FONT};font-size:15px;font-weight:500;line-height:20px;text-decoration:none;">${label}</a>`;
};

const pill = (label: string, bg: string, fg: string) =>
  `<span style="display:inline-block;background:${bg};color:${fg};border:1px solid rgba(255,255,255,0.35);border-radius:980px;padding:6px 12px;font-family:${FONT};font-size:12px;font-weight:600;letter-spacing:0.3px;">${label}</span>`;

/** Dark photographic header using the portfolio's landscape */
const hero = ({
  eyebrow,
  title,
  subtitle,
  badge,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  badge: string;
}) => `
<tr>
  <td background="${asset("/email/header.jpg")}" bgcolor="${C.night}" valign="bottom"
      style="background:${C.night} url('${asset("/email/header.jpg")}') center top / cover no-repeat;border-radius:24px 24px 0 0;padding:0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td class="px" style="padding:28px 36px 0 36px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="left" valign="middle">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
                  <td width="40" height="40" align="center" valign="middle"
                      style="width:40px;height:40px;border-radius:12px;background:rgba(255,255,255,0.18);border:1px solid rgba(255,255,255,0.45);font-family:${FONT};font-size:15px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">VK</td>
                  <td style="padding-left:12px;font-family:${FONT};font-size:15px;font-weight:600;color:#ffffff;">${esc(profile.name)}</td>
                </tr></table>
              </td>
              <td align="right" valign="middle">${badge}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td class="px" style="padding:96px 36px 36px 36px;font-family:${FONT};">
          <div style="font-size:13px;line-height:18px;font-weight:600;letter-spacing:1.4px;text-transform:uppercase;color:rgba(255,255,255,0.72);">${eyebrow}</div>
          <div class="h1" style="padding-top:10px;font-size:40px;line-height:44px;font-weight:700;letter-spacing:-1px;color:#ffffff;">${title}</div>
          <div style="padding-top:10px;font-size:18px;line-height:26px;color:rgba(255,255,255,0.82);">${subtitle}</div>
        </td>
      </tr>
    </table>
  </td>
</tr>`;

/** Three-step status tracker */
const tracker = (receivedAt: string) => {
  const step = (
    n: string,
    title: string,
    sub: string,
    color: string,
    done: boolean,
  ) => `
    <td class="col" width="33%" valign="top" style="padding:0 6px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td height="6" bgcolor="${done ? color : C.line}" style="height:6px;border-radius:6px;background:${done ? color : C.line};font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr><td style="padding-top:14px;font-family:${FONT};">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
            <td width="22" height="22" align="center" valign="middle" bgcolor="${done ? color : C.tint}"
                style="width:22px;height:22px;border-radius:11px;background:${done ? color : C.tint};border:1px solid ${done ? color : C.line};font-size:12px;font-weight:700;color:${done ? "#ffffff" : C.faint};">${n}</td>
            <td style="padding-left:8px;font-size:14px;font-weight:600;color:${C.ink};">${title}</td>
          </tr></table>
          <div style="padding-top:6px;font-size:13px;line-height:18px;color:${C.sub};">${sub}</div>
        </td></tr>
      </table>
    </td>`;

  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      ${step("&#10003;", "Received", esc(receivedAt), C.green, true)}
      ${step("&#10003;", "Reading", "I review every message myself", C.blue, true)}
      ${step("3", "Reply", "Within 1 business day", C.violet, false)}
    </tr>
  </table>`;
};

/** Quoted message card with avatar and accent bar */
const messageCard = (m: ContactMessage, label: string) => `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.tint}" style="background:${C.tint};border-radius:18px;border:1px solid ${C.line};">
  <tr>
    <td width="4" bgcolor="${C.blue}" style="width:4px;background:${C.blue};background-image:linear-gradient(180deg,${C.blue},${C.violet});border-radius:18px 0 0 18px;font-size:0;">&nbsp;</td>
    <td style="padding:22px 24px;font-family:${FONT};">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td width="36" height="36" align="center" valign="middle" bgcolor="${C.violet}"
            style="width:36px;height:36px;border-radius:18px;background:${C.violet};background-image:linear-gradient(135deg,${C.blue},${C.violet});font-size:15px;font-weight:700;color:#ffffff;">${esc(initial(m.name))}</td>
        <td style="padding-left:12px;">
          <div style="font-size:15px;line-height:20px;font-weight:600;color:${C.ink};">${esc(m.name)}</div>
          <div style="font-size:13px;line-height:18px;color:${C.sub};">${label}</div>
        </td>
      </tr></table>
      <div style="padding-top:16px;font-size:16px;line-height:25px;color:${C.ink};">${nl2br(m.message)}</div>
    </td>
  </tr>
</table>`;

/** Link tiles shown while the visitor waits */
const tiles = () => {
  const tile = (
    href: string,
    color: string,
    glyph: string,
    title: string,
    sub: string,
  ) => `
    <td class="col" width="33%" valign="top" style="padding:0 6px;">
      <a href="${href}" style="display:block;text-decoration:none;background:#ffffff;border:1px solid ${C.line};border-radius:16px;padding:18px 16px;box-shadow:0 6px 18px -10px rgba(12,14,24,0.25);">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td width="34" height="34" align="center" valign="middle" bgcolor="${color}"
              style="width:34px;height:34px;border-radius:10px;background:${color};font-family:${FONT};font-size:15px;font-weight:700;color:#ffffff;">${glyph}</td>
        </tr></table>
        <div style="padding-top:12px;font-family:${FONT};font-size:15px;font-weight:600;color:${C.ink};">${title} &rarr;</div>
        <div style="padding-top:4px;font-family:${FONT};font-size:13px;line-height:18px;color:${C.sub};">${sub}</div>
      </a>
    </td>`;

  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      ${tile(`${siteConfig.url}/#projects`, C.blue, "&#9670;", "Projects", "Things I have built")}
      ${tile(`${siteConfig.url}/#experience`, C.amber, "&#9650;", "Experience", "12+ years of shipping")}
      ${tile(asset(profile.resume), C.green, "&#8595;", "Resume", "Download the PDF")}
    </tr>
  </table>`;
};

/** Signature card */
const signature = () => {
  const chip = (href: string, label: string) =>
    `<a href="${href}" style="display:inline-block;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.22);color:#ffffff;border-radius:980px;padding:8px 14px;font-family:${FONT};font-size:13px;text-decoration:none;">${label}</a>`;

  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.night}"
       style="background:${C.night};background-image:linear-gradient(135deg,${C.night} 0%,${C.night2} 100%);border-radius:20px;">
  <tr>
    <td style="padding:26px 26px 24px 26px;font-family:${FONT};">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td width="56" height="56" align="center" valign="middle" bgcolor="${C.blue}"
            style="width:56px;height:56px;border-radius:16px;background:${C.blue};background-image:linear-gradient(135deg,${C.blue},${C.violet});font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">VK</td>
        <td style="padding-left:16px;">
          <div style="font-size:19px;line-height:24px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">${esc(profile.name)}</div>
          <div style="font-size:14px;line-height:20px;color:rgba(255,255,255,0.75);">${esc(profile.title)}</div>
          <div style="font-size:13px;line-height:18px;color:rgba(255,255,255,0.55);">${esc(profile.location)}</div>
        </td>
      </tr></table>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;"><tr>
        <td style="padding:0 8px 8px 0;">${chip(`mailto:${profile.email}`, esc(profile.email))}</td>
        <td style="padding:0 8px 8px 0;">${chip(profile.linkedin, "LinkedIn")}</td>
        <td style="padding:0 0 8px 0;">${chip(profile.github, "GitHub")}</td>
      </tr></table>
    </td>
  </tr>
</table>`;
};

const footer = (note: string) => `
<tr>
  <td align="center" style="padding:28px 24px 0 24px;font-family:${FONT};font-size:12px;line-height:19px;color:${C.faint};">
    ${note}<br>
    <a href="${siteConfig.url}" style="color:${C.faint};text-decoration:underline;">${esc(siteConfig.url.replace(/^https?:\/\//, ""))}</a>
    &nbsp;&middot;&nbsp; ${esc(profile.location)}
  </td>
</tr>`;

const shell = (preheader: string, rows: string) => `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light">
<title>${esc(profile.name)}</title>
<style>
  @media (max-width: 620px) {
    .px { padding-left: 22px !important; padding-right: 22px !important; }
    .col { display: block !important; width: 100% !important; padding: 0 0 12px 0 !important; }
    .h1 { font-size: 32px !important; line-height: 36px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.page};-webkit-font-smoothing:antialiased;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.page}" style="background:${C.page};">
  <tr>
    <td align="center" style="padding:40px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
        ${rows}
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

const body = (inner: string) => `
<tr>
  <td bgcolor="${C.card}" class="px" style="background:${C.card};border-radius:0 0 24px 24px;padding:36px;font-family:${FONT};color:${C.ink};box-shadow:0 20px 50px -24px rgba(12,14,24,0.35);">
    ${inner}
  </td>
</tr>`;

const section = (title: string) =>
  `<div style="padding:34px 0 14px 0;font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${C.faint};">${title}</div>`;

const fmtWhen = (d: Date) =>
  d.toLocaleString("en-CA", {
    timeZone: "America/Edmonton",
    dateStyle: "medium",
    timeStyle: "short",
  });

/* ------------------------------------------------------------------ */

/** Confirmation sent to the visitor */
export function autoReply(
  m: ContactMessage,
  meta: { receivedAt: Date } = { receivedAt: new Date() },
) {
  const name = firstName(m.name);
  const subject = `Thanks for reaching out, ${name} - message received`;

  const html = shell(
    "Your message reached me. I'll reply personally within one business day.",
    `
    ${hero({
      eyebrow: "Message received",
      title: `Thanks, ${esc(name)}.`,
      subtitle: "Your message is in my inbox and I'll reply personally.",
      badge: pill("&#9679;&nbsp; Delivered", "rgba(48,209,88,0.28)", "#ffffff"),
    })}
    ${body(`
      <p style="margin:0;font-size:17px;line-height:27px;">Hi ${esc(name)},</p>
      <p style="margin:14px 0 0 0;font-size:17px;line-height:27px;color:${C.ink};">
        Thank you for getting in touch through my portfolio. I read every message myself and will get back to you
        <strong style="font-weight:600;">within one business day</strong>. If it's time-sensitive, just reply to this email.
      </p>

      ${section("Where things stand")}
      ${tracker(fmtWhen(meta.receivedAt))}

      ${section("What you sent")}
      ${messageCard(m, esc(m.email))}

      ${section("While you wait")}
      ${tiles()}

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:30px;"><tr>
        <td style="padding:0 10px 10px 0;">${button(siteConfig.url, "Visit my portfolio")}</td>
        <td style="padding:0 0 10px 0;">${button(profile.linkedin, "Connect on LinkedIn", "ghost")}</td>
      </tr></table>

      <p style="margin:26px 0 18px 0;font-size:17px;line-height:27px;">Talk soon,</p>
      ${signature()}
    `)}
    ${footer("You're receiving this because you contacted me through my portfolio.")}
  `,
  );

  const text = `Thanks, ${name}. Message received.

Hi ${name},

Thank you for getting in touch through my portfolio. I read every message myself and will get back to you within one business day. If it's time-sensitive, just reply to this email.

Where things stand
  [x] Received   ${fmtWhen(meta.receivedAt)}
  [x] Reading    I review every message myself
  [ ] Reply      Within 1 business day

What you sent
${m.message}

While you wait
  Projects:   ${siteConfig.url}/#projects
  Experience: ${siteConfig.url}/#experience
  Resume:     ${asset(profile.resume)}

Talk soon,

${profile.name}
${profile.title}
${profile.location}
${profile.email}
LinkedIn: ${profile.linkedin}
GitHub:   ${profile.github}
`;

  return { subject, html, text };
}

/** Notification sent to me */
export function notification(m: ContactMessage, meta: { receivedAt: Date }) {
  const subject = `New portfolio message from ${m.name}`;
  const when = fmtWhen(meta.receivedAt);

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid ${C.line};font-family:${FONT};font-size:13px;color:${C.faint};width:96px;vertical-align:top;">${label}</td>
      <td style="padding:12px 0;border-bottom:1px solid ${C.line};font-family:${FONT};font-size:15px;color:${C.ink};">${value}</td>
    </tr>`;

  const html = shell(
    `${m.name}: ${m.message.slice(0, 90)}`,
    `
    ${hero({
      eyebrow: "Portfolio contact form",
      title: "New message",
      subtitle: `From ${esc(m.name)}`,
      badge: pill("&#9679;&nbsp; New", "rgba(0,113,227,0.4)", "#ffffff"),
    })}
    ${body(`
      ${messageCard(m, esc(m.email))}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:22px;">
        ${row("From", esc(m.name))}
        ${row("Email", `<a href="mailto:${esc(m.email)}" style="color:${C.blue};text-decoration:none;">${esc(m.email)}</a>`)}
        ${row("Received", esc(when))}
      </table>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;"><tr>
        <td style="padding:0 10px 10px 0;">${button(`mailto:${esc(m.email)}?subject=${encodeURIComponent("Re: your message")}`, `Reply to ${esc(firstName(m.name))}`)}</td>
        <td style="padding:0 0 10px 0;">${button(siteConfig.url, "Open portfolio", "ghost")}</td>
      </tr></table>
    `)}
    ${footer("Sent automatically by your portfolio. Replying goes straight to the sender.")}
  `,
  );

  const text = `New portfolio message

From: ${m.name}
Email: ${m.email}
Received: ${when}

${m.message}
`;

  return { subject, html, text };
}
