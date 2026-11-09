import { profile } from "@/config/resume";
import { siteConfig } from "@/config/site";

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const nl2br = (s: string) => esc(s).replace(/\r?\n/g, "<br>");

const FONT =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif";

const firstName = (name: string) => name.trim().split(/\s+/)[0] || "there";

/** Shared shell: centered 600px card, Apple-style type and spacing, table layout for email clients */
const shell = ({
  preheader,
  body,
}: {
  preheader: string;
  body: string;
}) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(profile.name)}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f7;-webkit-font-smoothing:antialiased;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f5f7;">
  <tr>
    <td align="center" style="padding:48px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
        <tr>
          <td align="center" style="padding:0 0 28px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" valign="middle" width="44" height="44" style="width:44px;height:44px;border-radius:12px;background:#1d1d1f;font-family:${FONT};font-size:17px;font-weight:600;color:#ffffff;letter-spacing:-0.5px;">VK</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;border-radius:18px;padding:48px 48px 40px 48px;font-family:${FONT};color:#1d1d1f;">
            ${body}
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:28px 24px 0 24px;font-family:${FONT};font-size:12px;line-height:18px;color:#86868b;">
            ${esc(profile.location)}<br>
            <a href="${siteConfig.url}" style="color:#86868b;text-decoration:underline;">${esc(siteConfig.url.replace(/^https?:\/\//, ""))}</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

const signature = () => `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:36px;border-top:1px solid #e8e8ed;width:100%;">
  <tr>
    <td style="padding-top:24px;font-family:${FONT};">
      <div style="font-size:17px;line-height:24px;font-weight:600;color:#1d1d1f;">${esc(profile.name)}</div>
      <div style="font-size:14px;line-height:20px;color:#6e6e73;">${esc(profile.title)}</div>
      <div style="font-size:14px;line-height:20px;color:#6e6e73;">${esc(profile.location)}</div>
      <div style="padding-top:12px;font-size:14px;line-height:22px;">
        <a href="mailto:${profile.email}" style="color:#0066cc;text-decoration:none;">${esc(profile.email)}</a><br>
        <a href="${siteConfig.url}" style="color:#0066cc;text-decoration:none;">Portfolio</a>
        <span style="color:#d2d2d7;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="${profile.linkedin}" style="color:#0066cc;text-decoration:none;">LinkedIn</a>
        <span style="color:#d2d2d7;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="${profile.github}" style="color:#0066cc;text-decoration:none;">GitHub</a>
      </div>
    </td>
  </tr>
</table>`;

const quote = (m: ContactMessage) => `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:28px 0 0 0;">
  <tr>
    <td style="background:#f5f5f7;border-radius:12px;padding:20px 22px;font-family:${FONT};">
      <div style="font-size:12px;line-height:16px;font-weight:600;letter-spacing:0.6px;text-transform:uppercase;color:#86868b;padding-bottom:10px;">Your message</div>
      <div style="font-size:15px;line-height:23px;color:#1d1d1f;">${nl2br(m.message)}</div>
    </td>
  </tr>
</table>`;

/** Auto-reply sent to the visitor */
export function autoReply(m: ContactMessage) {
  const name = firstName(m.name);
  const subject = `Thanks for reaching out, ${name}`;

  const html = shell({
    preheader: `I received your message and will get back to you within one business day.`,
    body: `
      <h1 style="margin:0;font-size:32px;line-height:38px;font-weight:600;letter-spacing:-0.6px;color:#1d1d1f;">Thanks, ${esc(name)}.</h1>
      <p style="margin:12px 0 0 0;font-size:19px;line-height:28px;color:#6e6e73;">Your message is in my inbox.</p>
      <p style="margin:28px 0 0 0;font-size:17px;line-height:27px;color:#1d1d1f;">
        Hi ${esc(name)},
      </p>
      <p style="margin:16px 0 0 0;font-size:17px;line-height:27px;color:#1d1d1f;">
        Thank you for getting in touch through my portfolio. I've received your message and will personally reply within one business day.
      </p>
      <p style="margin:16px 0 0 0;font-size:17px;line-height:27px;color:#1d1d1f;">
        If it's time-sensitive, simply reply to this email and it will come straight to me.
      </p>
      ${quote(m)}
      <p style="margin:32px 0 0 0;font-size:17px;line-height:27px;color:#1d1d1f;">Best regards,</p>
      ${signature()}
    `,
  });

  const text = `Thanks, ${name}.

Thank you for getting in touch through my portfolio. I've received your message and will personally reply within one business day.

If it's time-sensitive, simply reply to this email and it will come straight to me.

Your message:
${m.message}

Best regards,

${profile.name}
${profile.title}
${profile.location}
${profile.email}
Portfolio: ${siteConfig.url}
LinkedIn: ${profile.linkedin}
GitHub: ${profile.github}
`;

  return { subject, html, text };
}

/** Notification sent to me */
export function notification(m: ContactMessage, meta: { receivedAt: Date }) {
  const subject = `New portfolio message from ${m.name}`;
  const when = meta.receivedAt.toLocaleString("en-CA", {
    timeZone: "America/Edmonton",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e8e8ed;font-size:13px;color:#86868b;width:90px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #e8e8ed;font-size:15px;color:#1d1d1f;">${value}</td>
    </tr>`;

  const html = shell({
    preheader: `${m.name}: ${m.message.slice(0, 90)}`,
    body: `
      <h1 style="margin:0;font-size:28px;line-height:34px;font-weight:600;letter-spacing:-0.5px;color:#1d1d1f;">New message</h1>
      <p style="margin:8px 0 0 0;font-size:17px;line-height:25px;color:#6e6e73;">Sent from your portfolio contact form.</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:24px;font-family:${FONT};">
        ${row("From", esc(m.name))}
        ${row("Email", `<a href="mailto:${esc(m.email)}" style="color:#0066cc;text-decoration:none;">${esc(m.email)}</a>`)}
        ${row("Received", esc(when))}
      </table>
      <div style="margin-top:24px;font-size:17px;line-height:27px;color:#1d1d1f;">${nl2br(m.message)}</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:32px;">
        <tr>
          <td style="border-radius:980px;background:#0071e3;">
            <a href="mailto:${esc(m.email)}?subject=${encodeURIComponent(`Re: your message`)}" style="display:inline-block;padding:12px 22px;font-family:${FONT};font-size:15px;color:#ffffff;text-decoration:none;">Reply to ${esc(firstName(m.name))}</a>
          </td>
        </tr>
      </table>
    `,
  });

  const text = `New portfolio message

From: ${m.name}
Email: ${m.email}
Received: ${when}

${m.message}
`;

  return { subject, html, text };
}
