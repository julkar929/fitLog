"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { PlanItem, Workout } from "@/lib/types";

const PLAN_CAP = 5;

interface PlanContextValue {
  plan: PlanItem[];
  saved: PlanItem[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  markDone: (id: string | number) => void;
  removeFromPlan: (id: string | number) => void;
  removeFromSaved: (id: string | number) => void;
}

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<PlanItem[]>([]);

  const isInPlan = (id: string | number) =>
    plan.some((p) => String(p.id) === String(id));
  const isSaved = (id: string | number) =>
    saved.some((s) => String(s.id) === String(id));

  const addToPlan = (workout: Workout) => {
    if (isInPlan(workout.id)) {
      alert("Already in today's plan");
      return;
    }
    if (plan.length >= PLAN_CAP) {
      alert("Today's plan is full (max 5).");
      return;
    }
    setPlan((prev) => [...prev, { ...workout, addedAt: Date.now() }]);
    alert("Added to today's plan ✅");
  };

  const addToSaved = (workout: Workout) => {
    if (isSaved(workout.id)) {
      alert("Already saved");
      return;
    }
    setSaved((prev) => [...prev, { ...workout, addedAt: Date.now() }]);
    alert("Saved for later ✅");
  };

  const markDone = (id: string | number) => {
    setPlan((prev) =>
      prev.map((p) => (String(p.id) === String(id) ? { ...p, done: true } : p))
    );
    alert("Marked as done ✅");
  };

  const removeFromPlan = (id: string | number) => {
    setPlan((prev) => prev.filter((p) => String(p.id) !== String(id)));
    alert("Removed from plan");
  };

  const removeFromSaved = (id: string | number) => {
    setSaved((prev) => prev.filter((s) => String(s.id) !== String(id)));
    alert("Removed from saved");
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        addToSaved,
        markDone,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within a PlanProvider");
  return ctx;
}