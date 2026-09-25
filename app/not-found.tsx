import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-5 py-24 text-center">
      {/* Icon */}
      <SearchX size={72} className="text-accent" strokeWidth={1.5} />

      {/* 404 */}
      <p className="mt-6 font-display text-7xl font-bold text-accent">404</p>

      {/* Title */}
      <h1 className="mt-2 font-display text-2xl font-bold uppercase text-text">
        Page not found
      </h1>

      {/* Description */}
      <p className="mt-3 text-text-muted">
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>

      {/* Back button */}
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-105"
      >
        <ArrowLeft size={18} />
        Back to Home
      </Link>
    </div>
  );
}