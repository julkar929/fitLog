"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ClipboardPlus, Bookmark, ArrowLeft } from "lucide-react";
import Loader from "@/components/Loader";
import { getWorkoutById } from "@/lib/api";
import { Workout } from "@/lib/types";
import { usePlan } from "@/context/PlanContext";

const SPEC_ROWS: { key: keyof Workout; label: string; suffix?: string }[] = [
  { key: "equipment", label: "EQUIPMENT" },
  { key: "difficulty", label: "DIFFICULTY" },
  { key: "sets", label: "SETS" },
  { key: "reps", label: "REPS" },
  { key: "duration", label: "DURATION", suffix: " min" },
  { key: "calories", label: "CALORIES", suffix: " kcal" },
  { key: "rating", label: "RATING" },
];

export default function WorkoutDetailPage() {
  const params = useParams<{ id: string }>();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { addToPlan, addToSaved } = usePlan();
  
  useEffect(() => {
    let active = true;
    getWorkoutById(params.id)
      .then((data) => {
        if (!active) return;
        if (data) setWorkout(data);
        else setNotFound(true);
      })
      .catch(() => active && setNotFound(true))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [params.id]);

  if (loading) return <Loader label="Loading workout…" />;

  if (notFound || !workout) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="font-display text-2xl font-bold uppercase text-text">
          Workout not found
        </h1>
        <p className="mt-2 text-text-muted">
          This lift doesn&apos;t exist or was removed.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-black"
        >
          <ArrowLeft size={18} /> Back to library
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      {/* Back link */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors"
      >
        <ArrowLeft size={16} /> Back to library
      </Link>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/*left side */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-base-border bg-base-card">
          {workout.image ? (
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center text-text-muted">
              No image
            </div>
          )}
        </div>

        {/* right side*/}
        <div>
          {/* Title */}
          <h1 className="font-display text-3xl font-bold uppercase leading-tight text-text sm:text-4xl">
            {workout.name}
          </h1>

          {/* Description */}
          <p className="mt-3 text-text-secondary">{workout.description}</p>

          {/* Category */}
          <div className="mt-4 flex flex-wrap gap-2">
            {(workout.categories || [workout.category])
              .filter(Boolean)
              .map((cat) => (
                <span
                  key={String(cat)}
                  className="rounded-full border border-accent/40 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent"
                >
                  {cat}
                </span>
              ))}
          </div>

          {/* Specs Table */}
          <div className="mt-6 divide-y divide-base-border overflow-hidden rounded-lg border border-base-border">
            {SPEC_ROWS.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between bg-base-card px-4 py-2.5 text-sm"
              >
                <span className="font-semibold text-text-muted">
                  {row.label}
                </span>
                <span className="font-semibold text-text">
                  {String(workout[row.key] ?? "—")}
                  {row.suffix ?? ""}
                </span>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="mt-8">
            <h2 className="font-display text-lg font-bold uppercase text-text">
              Instructions
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-text-secondary">
              {workout.instructions?.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => addToPlan(workout)}
              className="flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-display text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-105"
            >
              <ClipboardPlus size={18} />
              Add to today&apos;s plan
            </button>
            <button
              onClick={() => addToSaved(workout)}
              className="flex items-center gap-2 rounded-md border border-base-border px-5 py-3 font-display text-sm font-bold uppercase tracking-wide text-text-secondary transition-colors hover:border-accent hover:text-accent"
            >
              <Bookmark size={18} />
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}