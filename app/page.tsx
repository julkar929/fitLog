import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { getAllWorkouts } from "@/lib/api";

export default async function Home() {
  const workouts = await getAllWorkouts();
  return (
    <>
    <Hero />
    <div className="p-10 text-shadow-green-400">
      <h1 className="text-4xl font-bold">Found {workouts.length} workouts</h1>
      <div className="mt-4 space-y-2">
        {workouts.map((w) => (
          <div key={w.id} className="border border-gray-700 p-3 rounded">
            <p className="font-bold">{w.name}</p>
            <p className="text-sm text-pink-400">
              {w.calories} kcal · {w.duration} min · {w.categories?.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
