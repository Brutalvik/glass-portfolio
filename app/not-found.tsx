import Link from "next/link";

import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] items-center justify-center py-32">
      <div className="glass glass-strong w-full max-w-xl rounded-[36px] p-10 text-center md:p-14">
        <Logo className="text-[34px]" />
        <p className="eyebrow mt-8">Error 404</p>
        <h1 className="text-gradient mt-3 text-5xl font-semibold tracking-tight md:text-6xl">
          Lost in the snow.
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ink/75">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
          Let&apos;s get you back on the trail.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            className="rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-paper transition hover:opacity-85"
            href="/"
          >
            Back to home
          </Link>
          <Link
            className="rounded-full bg-ink/10 px-6 py-3 text-[15px] font-medium text-ink transition hover:bg-ink/15"
            href="/#projects"
          >
            See projects
          </Link>
        </div>
      </div>
    </section>
  );
}
