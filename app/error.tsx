"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="glass glass-strong rounded-[32px] p-10 text-center">
        <h2 className="text-2xl font-semibold text-ink">
          Something went wrong.
        </h2>
        <button
          className="mt-6 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-paper"
          type="button"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
