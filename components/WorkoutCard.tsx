import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/lib/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-base-border bg-base-card transition-transform hover:-translate-y-1 hover:border-accent/50"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full bg-base-soft">
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

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Category */}
        <div className="flex flex-wrap gap-2">
          {(workout.categories || [workout.category]).filter(Boolean).map((cat) => (
            <span
              key={String(cat)}
              className="rounded-full border border-accent/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="font-display text-base font-bold uppercase leading-snug text-text">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="text-xs text-text-muted">{workout.equipment}</p>

        {/* Row information */}
        <div className="mt-auto flex items-center gap-4 pt-2 text-xs text-text-secondary">
          <span className="flex items-center gap-1">
            <Clock size={13} /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={13} /> {workout.calories} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={13} className="fill-accent text-accent" /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}