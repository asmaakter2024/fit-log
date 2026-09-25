import Image from "next/image";
import React from "react";
import WorkoutCard from "../shared/WorkoutCard";

const getWorkouts = async () => {
  const response = await fetch("https://api.abcz.workers.dev/api/fitlog");
  const data = await response.json();

  return data;
};

const Workouts = async () => {
  const workOutData = await getWorkouts();

  return (
    <section className="mx-4 mt-8 rounded-2xl bg-[#111218] px-5 py-8 text-white">
      <header className="mb-6">
        <h1 className="text-3xl font-black tracking-tight">THE LIBRARY</h1>
        <p className="mt-1 text-sm text-white/60">
          Twelve lifts covering every major muscle group.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {workOutData.map((work, ind) => {
          return <WorkoutCard key={ind} work={work} />;
        })}
      </div>
    </section>
  );
};

export default Workouts;
