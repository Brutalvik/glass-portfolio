import clsx from "clsx";

import { Company } from "@/config/resume";

/**
 * Company wordmark. Uses the official logo from /public/logos when one is
 * configured; otherwise renders a neutral typographic mark.
 */
export function CompanyMark({
  company,
  className,
}: {
  company: Company;
  className?: string;
}) {
  if (company.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={company.name}
        className={clsx("logo-mark h-7 w-auto object-contain", className)}
        src={company.logo}
      />
    );
  }

  return (
    <span
      aria-label={company.name}
      className={clsx("flex flex-col items-center leading-none", className)}
      role="img"
    >
      <span className="text-[22px] font-semibold tracking-tight text-ink/85">
        {company.mark}
      </span>
      {company.sub && (
        <span className="mt-1 max-w-[11rem] text-center text-[9.5px] font-medium uppercase tracking-[0.14em] text-ink/55">
          {company.sub}
        </span>
      )}
    </span>
  );
}

/** Square glass-like tile for experience cards */
export function CompanyTile({ company }: { company: Company }) {
  const initials =
    company.mark.length <= 4
      ? company.mark.toUpperCase()
      : company.mark.slice(0, 1).toUpperCase();

  return (
    <div
      aria-hidden
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-ink/10 bg-ink/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
    >
      {company.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt=""
          className="logo-mark h-6 w-8 object-contain"
          src={company.logo}
        />
      ) : (
        <span
          className={clsx(
            "font-semibold tracking-tight text-ink",
            initials.length > 3 ? "text-[11px]" : "text-[15px]",
          )}
        >
          {initials}
        </span>
      )}
    </div>
  );
}
