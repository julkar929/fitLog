import { Workout } from "./types";

const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";


function normalizeWorkout(raw: any): Workout {
  return {
    id: raw.id,
    name: raw.name,
    category: raw.muscleGroups?.[0] || "GENERAL",
    categories: raw.muscleGroups || ["GENERAL"],
    equipment: raw.equipment || "Bodyweight",
    image: raw.image || "",
    duration: raw.duration || 0,
    calories: raw.caloriesBurned || 0, 
    rating: raw.rating || 0,
    difficulty: raw.difficulty || "Beginner",
    sets: raw.sets || 0,
    reps: String(raw.reps || ""),
    description: raw.description || "",
    instructions: raw.instructions || [],
  };
}

export async function getAllWorkouts(): Promise<Workout[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch workouts");
  const data = await res.json();
  return data.map(normalizeWorkout);
}

export async function getWorkoutById(id: string): Promise<Workout | null> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch workout");
  const data = await res.json();
  const raw = data.find((w: any) => String(w.id) === String(id));
  return raw ? normalizeWorkout(raw) : null;
}