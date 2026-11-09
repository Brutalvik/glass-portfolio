"use client";

import type { ReactNode } from "react";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { Glass } from "@/components/glass";
import { profile } from "@/config/resume";

/** Adds the embed parameters Cal.com and Calendly expect, and matches the current theme */
function embedUrl(raw: string, theme: string) {
  try {
    const url = new URL(raw);

    if (url.hostname.endsWith("calendly.com")) {
      url.searchParams.set("embed_type", "Inline");
      url.searchParams.set("embed_domain", window.location.hostname);
      url.searchParams.set("hide_gdpr_banner", "1");
    } else {
      // Cal.com (cal.com or a self-hosted / custom domain)
      url.searchParams.set("embed", "true");
      url.searchParams.set("theme", theme === "light" ? "light" : "dark");
    }

    return url.toString();
  } catch {
    return raw;
  }
}

type BookingContextValue = { enabled: boolean; open: () => void };

const BookingContext = createContext<BookingContextValue>({
  enabled: false,
  open: () => {},
});

export const useBooking = () => useContext(BookingContext);

export function BookingProvider({ children }: { children: ReactNode }) {
  const enabled = Boolean(profile.booking);
  const [isOpen, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [src, setSrc] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const open = useCallback(() => {
    if (!enabled) return;
    returnFocus.current = document.activeElement as HTMLElement;
    setSrc(
      embedUrl(
        profile.booking,
        document.documentElement.dataset.theme ?? "dark",
      ),
    );
    setLoaded(false);
    setOpen(true);
  }, [enabled]);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!isOpen) {
      returnFocus.current?.focus?.();

      return;
    }

    const prev = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      // Keep Tab inside the dialog
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>(
          "button, a[href], iframe",
        );
        const first = f[0];
        const last = f[f.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <BookingContext.Provider value={{ enabled, open }}>
      {children}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <button
                  aria-label="Close booking"
                  className="absolute inset-0 cursor-default bg-black/45 backdrop-blur-sm"
                  tabIndex={-1}
                  type="button"
                  onClick={close}
                />
                <motion.div
                  ref={dialogRef}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  aria-labelledby="booking-title"
                  aria-modal="true"
                  className="relative w-full max-w-4xl"
                  exit={{ opacity: 0, y: 16, scale: 0.98 }}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  role="dialog"
                  transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                >
                  <Glass
                    strong
                    className="flex h-[min(86svh,760px)] flex-col rounded-[32px] p-2"
                  >
                    <div className="flex items-center justify-between gap-3 px-4 py-3">
                      <div>
                        <p className="eyebrow">Book a call</p>
                        <p
                          className="text-[17px] font-semibold text-ink"
                          id="booking-title"
                        >
                          Pick a time that works for you
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          className="hidden rounded-full bg-ink/10 px-3 py-1.5 text-[13px] font-medium text-ink transition hover:bg-ink/15 sm:inline-block"
                          href={profile.booking}
                          rel="noreferrer"
                          target="_blank"
                        >
                          Open in new tab
                        </a>
                        <button
                          ref={closeRef}
                          aria-label="Close"
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/10 text-ink transition hover:bg-ink/20"
                          type="button"
                          onClick={close}
                        >
                          <svg
                            aria-hidden
                            fill="none"
                            height="16"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="16"
                          >
                            <path d="M6 6l12 12M18 6L6 18" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="relative flex-1 overflow-hidden rounded-[24px] bg-paper/80">
                      {!loaded && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-ink/70">
                          <span className="h-7 w-7 animate-spin rounded-full border-2 border-ink/20 border-t-ink/70" />
                          <span className="text-[13px]">
                            Loading calendar...
                          </span>
                        </div>
                      )}
                      <iframe
                        allow="payment"
                        className={clsx(
                          "h-full w-full transition-opacity duration-500",
                          loaded ? "opacity-100" : "opacity-0",
                        )}
                        src={src}
                        title="Booking calendar"
                        onLoad={() => setLoaded(true)}
                      />
                    </div>
                  </Glass>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </BookingContext.Provider>
  );
}

/** Button that opens the booking modal. Renders nothing until a booking URL is configured. */
export function BookCallButton({
  className,
  children = "Book a call",
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { enabled, open } = useBooking();

  if (!enabled) return null;

  return (
    <button className={className} type="button" onClick={open}>
      <svg
        aria-hidden
        fill="none"
        height="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
        width="16"
      >
        <rect height="16" rx="3" width="18" x="3" y="5" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </svg>
      {children}
    </button>
  );
}
