"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const linkClass = (href: string) =>
    `text-sm font-semibold tracking-wide transition-colors ${
      pathname === href ? "text-accent" : "text-text-secondary hover:text-text"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-base-border bg-base/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={28} height={28} />
          <span className="font-display text-lg font-bold tracking-wide text-text">
            FITLOG
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className={linkClass("/")}>Workout</Link>
          <Link href="/my-plan" className={linkClass("/my-plan")}>My Plan</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-black"
          >
            Plan {plan.length > 0 && `(${plan.length})`}
          </Link>
          <Link
            href="/my-plan"
            className="rounded-full border border-base-border px-3 py-1 text-xs font-bold text-text-secondary"
          >
            Saved {saved.length > 0 && `(${saved.length})`}
          </Link>
        </div>
      </div>

      {/* Mobile Nav */}
      <nav className="flex items-center justify-center gap-8 border-t border-base-border py-2 md:hidden">
        <Link href="/" className={linkClass("/")}>Workout</Link>
        <Link href="/my-plan" className={linkClass("/my-plan")}>My Plan</Link>
      </nav>
    </header>
  );
}