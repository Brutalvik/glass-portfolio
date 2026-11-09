/**
 * Cloudflare Turnstile server-side verification.
 * Enabled when TURNSTILE_SECRET_KEY is set (pair it with NEXT_PUBLIC_TURNSTILE_SITE_KEY).
 * https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */
export const turnstileEnabled = () => Boolean(process.env.TURNSTILE_SECRET_KEY);

export async function verifyTurnstile(
  token: string | undefined,
  ip?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });

  if (ip && ip !== "unknown") body.set("remoteip", ip);

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body,
        signal: AbortSignal.timeout(5000),
      },
    );
    const data = (await res.json()) as { success?: boolean };

    return Boolean(data.success);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("turnstile: verification failed", err);

    return false;
  }
}
