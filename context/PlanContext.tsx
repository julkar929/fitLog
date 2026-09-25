"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { PlanItem, Workout } from "@/lib/types";
import { useToast } from "./ToastContext";

const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";
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

{/* read from localStorage */}
function readStorage(key: string): PlanItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}


export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<PlanItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const { showToast } = useToast();
  
   {/* read from localStorage 1st time */}
  useEffect(() => {
    setPlan(readStorage(PLAN_KEY));
    setSaved(readStorage(SAVED_KEY));
    setHydrated(true);
  }, []);

  {/* when plan change store in localStorage */}
  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  {/* when saved change store in localStorage */}
  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);



  const isInPlan = (id: string | number) =>
    plan.some((p) => String(p.id) === String(id));
  const isSaved = (id: string | number) =>
    saved.some((s) => String(s.id) === String(id));

  const addToPlan = (workout: Workout) => {
    if (isInPlan(workout.id)) {
      showToast("Already in today's plan");
      return;
    }
    if (plan.length >= PLAN_CAP) {
      showToast("Today's plan is full (max 5).");
      return;
    }
    setPlan((prev) => [...prev, { ...workout, addedAt: Date.now() }]);
    showToast("Added to today's plan ✅");
  };

  const addToSaved = (workout: Workout) => {
    if (isSaved(workout.id)) {
      showToast("Already saved");
      return;
    }
    setSaved((prev) => [...prev, { ...workout, addedAt: Date.now() }]);
    showToast("Saved for later ✅");
  };

  const markDone = (id: string | number) => {
    setPlan((prev) =>
      prev.map((p) => (String(p.id) === String(id) ? { ...p, done: true } : p))
    );
    showToast("Marked as done ✅");
  };

  const removeFromPlan = (id: string | number) => {
    setPlan((prev) => prev.filter((p) => String(p.id) !== String(id)));
    showToast("Removed from plan");
  };

  const removeFromSaved = (id: string | number) => {
    setSaved((prev) => prev.filter((s) => String(s.id) !== String(id)));
    showToast("Removed from saved");
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