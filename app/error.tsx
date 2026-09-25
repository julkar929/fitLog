"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    //log
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-5 py-24 text-center">
      {/* Icon */}
      <AlertTriangle
        size={72}
        className="text-red-400"
        strokeWidth={1.5}
      />

      {/* Title */}
      <h1 className="mt-6 font-display text-3xl font-bold uppercase text-text">
        Something went wrong
      </h1>

      {/* Description */}
      <p className="mt-3 text-text-muted">
        Please try again — if the problem continues, reload the page.
      </p>

      {/* Try again button */}
      <button
        onClick={reset}
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-105"
      >
        <RotateCcw size={18} />
        Try again
      </button>
    </div>
  );
}