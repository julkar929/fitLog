import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
      {/*Left side */}
      <div>
        <p className="mb-3 text-sm font-bold tracking-[0.2em] text-accent">
          WORKOUT LIBRARY
        </p>

        {/*  Heading */}
        <h1 className="font-display text-4xl font-bold uppercase leading-tight text-text sm:text-5xl md:text-6xl">
          Train with intent.
          <br />
          Log every set.
        </h1>

        {/* Subtitle */}
        <p className="mt-5 max-w-md text-text-muted">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into today&apos;s plan, and watch the week&apos;s work add up.
        </p>

        {/* CTA Button */}
        <a
          href="#library"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-105"
        >
          Browse Workouts
          <ArrowRight size={18} />
        </a>
      </div>

      {/*right column */}
      <div className="relative mx-auto aspect-square w-full max-w-md">
        <Image
          src="/banner.png"
          alt="Workout illustration"
          fill
          className="object-contain drop-shadow-[0_0_40px_rgba(0,229,255,0.15)]"
          priority
        />
      </div>
    </section>
  );
}