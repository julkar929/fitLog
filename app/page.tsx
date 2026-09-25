"use client";

import Hero from "@/components/Hero";
import Loader from "@/components/Loader";
import WorkoutCard from "@/components/WorkoutCard";
import { getAllWorkouts } from "@/lib/api";
import { Workout } from "@/lib/types";
import { useEffect, useState } from "react";

export default async function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
  return (
    <>
    <Hero />
     <section id="library" className="mx-auto max-w-7xl px-5 py-16">
        {/* Header */}
        <div className="mb-8">
          <h2 className="font-display text-3xl font-bold uppercase text-text">
            The Library
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            Twelve lifts covering every major muscle group.
          </p>
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
        {!loading && !error && (<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {workouts.map((w) => (
          <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        )}
     </section>
    </>
  );
}
