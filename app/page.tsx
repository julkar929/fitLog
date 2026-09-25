"use client";

import Hero from "@/components/Hero";
import Loader from "@/components/Loader";
import SortDropdown, { SortKey } from "@/components/SortDropdown";
import WorkoutCard from "@/components/WorkoutCard";
import { getAllWorkouts } from "@/lib/api";
import { Workout } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("duration");

  useEffect(() => {
    let active = true;
    getAllWorkouts().then((data) => {
        if (active) setWorkouts(data);
      }).catch(() => {
        if (active) setError(true);
      }).finally(() => {
        if (active) setLoading(false);
      });
     return () => {
      active = false;
    };
  }, []);

 {/* Sorting Logic */}
  const sorted = useMemo(() => {
    const copy = [...workouts];
    copy.sort((a, b) => {
      if (sortKey === "rating") {
        return (b.rating ?? 0) - (a.rating ?? 0);
      }
      return ((a[sortKey] as number) ?? 0) - ((b[sortKey] as number) ?? 0);
    });
    return copy;
  }, [workouts, sortKey]);


  return (
    <>
    <Hero />
     <section id="library" className="mx-auto max-w-5xl px-5 py-16">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
          <h2 className="font-display text-3xl font-bold uppercase text-text">
            The Library
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

         {/* Header with sort dropdown */}
        {!loading && !error && workouts.length > 0 && (
            <SortDropdown value={sortKey} onChange={setSortKey} />
          )}
        </div>

        {/* Loading State */}
        {loading && <Loader label="Loading workouts…" />}

        {/* Error State */}
        {!loading && error && (
          <p className="py-20 text-center text-text-muted">
            Couldn&apos;t load the workout library right now. Please try again later.
          </p>
        )}
    
        {/* main grid part */}
        {!loading && !error && (<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((w) => (
          <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        )}
     </section>
    </>
  );
}
