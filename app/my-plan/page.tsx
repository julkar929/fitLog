"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, Check, X } from "lucide-react";
import Loader from "@/components/Loader";
import { usePlan } from "@/context/PlanContext";
import { PlanItem } from "@/lib/types";

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const { plan, saved, markDone, removeFromPlan, removeFromSaved } = usePlan();
  const [tab, setTab] = useState<Tab>("plan");
  const [loading, setLoading] = useState(true);

  {/* slow load for demon*/}
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  const list = tab === "plan" ? plan : saved;
  const totalMinutes = plan.reduce((sum, p) => sum + (p.duration || 0), 0);
  const totalCalories = plan.reduce((sum, p) => sum + (p.calories || 0), 0);

  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      {/* Header */}
      <h1 className="font-display text-3xl font-bold uppercase text-text">
        My Plan
      </h1>
      <p className="mt-1 text-sm text-text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Row stat*/}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <StatCard label="Exercises" value={plan.length} />
        <StatCard label="Minutes" value={totalMinutes} />
        <StatCard label="Calories" value={totalCalories} />
      </div>

      {/* Tab */}
      <div className="mt-8 flex gap-2 border-b border-base-border">
        {(["plan", "saved"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 font-display text-sm font-bold uppercase tracking-wide transition-colors ${
              tab === t
                ? "border-b-2 border-accent text-accent"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            {t === "plan" ? "Today's Plan" : "Saved"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6">
        {loading ? (
          <Loader label="Loading workouts…" />
        ) : list.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-4">
            {list.map((item) => (
              <PlanRow
                key={item.id}
                item={item}
                tab={tab}
                onDone={() => markDone(item.id)}
                onRemove={() =>
                  tab === "plan"
                    ? removeFromPlan(item.id)
                    : removeFromSaved(item.id)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

{/* Card state*/}
function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-base-border bg-base-card p-4 text-center">
      <p className="font-display text-2xl font-bold text-accent">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-text-muted">
        {label}
      </p>
    </div>
  );
}

{/* Empty state */}
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-base-border py-20 text-center">
      <h3 className="font-display text-xl font-bold uppercase text-text">
        Nothing here yet
      </h3>
      <p className="max-w-xs text-sm text-text-muted">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-3 rounded-md bg-accent px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-black"
      >
        Go to workouts
      </Link>
    </div>
  );
}

{/* Row */}
function PlanRow({
  item,
  tab,
  onDone,
  onRemove,
}: {
  item: PlanItem;
  tab: Tab;
  onDone: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-lg border border-base-border bg-base-card p-4 sm:flex-row sm:items-center">
      {/* Thumbnail */}
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-base-soft">
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            unoptimized
          />
        )}
      </div>

      {/* Information */}
      <div className="flex-1">
        <h4
          className={`font-display text-base font-bold uppercase ${
            item.done ? "text-text-muted line-through" : "text-text"
          }`}
        >
          {item.name}
        </h4>
        <p className="text-xs text-text-muted">{item.equipment}</p>
        <div className="mt-1 flex items-center gap-4 text-xs text-text-secondary">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {item.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={12} /> {item.calories} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={12} className="fill-accent text-accent" /> {item.rating}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Link
          href={`/workout/${item.id}`}
          className="rounded-md border border-base-border px-3 py-2 text-xs font-semibold text-text-secondary hover:border-accent hover:text-accent"
        >
          View Details
        </Link>
        {tab === "plan" && !item.done && (
          <button
            onClick={onDone}
            className="rounded-md bg-accent p-2 text-black"
            aria-label="Mark as done"
          >
            <Check size={16} />
          </button>
        )}
        <button
          onClick={onRemove}
          className="rounded-md border border-base-border p-2 text-text-secondary hover:border-red-400 hover:text-red-400"
          aria-label="Remove"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}