import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-base-border bg-base-soft">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 sm:flex-row">
        {/* Logo + Brand in Left */}
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={22} height={22} />
          <span className="font-display text-sm font-bold tracking-wide text-text">
            FITLOG
          </span>
        </div>

        {/* Right side is Copyright */}
        <p className="text-xs text-text-muted">
          © 2026 FitLog J9 — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}