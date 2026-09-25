export interface Workout {
  id: string | number;
  name: string;
  category?: string;
  categories?: string[];
  equipment?: string;
  image?: string;
  duration?: number;
  calories?: number;
  rating?: number;
  difficulty?: string;
  sets?: number;
  reps?: string;
  description?: string;
  instructions?: string[];
  [key: string]: unknown;
}

export type PlanTab = "plan" | "saved";

export interface PlanItem extends Workout {
  addedAt: number;
  done?: boolean;
}