"use client";

import { ChevronDown } from "lucide-react";

export type SortKey = "duration" | "calories" | "rating";

const OPTIONS: { key: SortKey; label: string }[] = [
  { key: "duration", label: "Duration" },
  { key: "calories", label: "Calories" },
  { key: "rating", label: "Rating" },
];

export default function SortDropdown({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (key: SortKey) => void;
}) {
  return (
    <div className="inline-flex items-center gap-2">
      <label className="text-xs font-semibold text-text-muted">Sort By</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          className="appearance-none rounded-md border border-base-border bg-base-card px-3 py-2 pr-8 text-sm text-text focus:border-accent focus:outline-none cursor-pointer"
        >
          {OPTIONS.map((opt) => (
            <option key={opt.key} value={opt.key} className="bg-base-card text-text">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-text-muted"
        />
      </div>
    </div>
  );
}