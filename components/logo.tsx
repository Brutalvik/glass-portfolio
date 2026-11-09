import clsx from "clsx";

/** "vk." wordmark. The dot uses the same color as the text. */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={clsx(
        "select-none font-extrabold lowercase leading-none tracking-[-0.06em] text-ink",
        className,
      )}
    >
      vk.
    </span>
  );
}
