"use client";

import { WorksContext } from "@/context/WorksContext";
import { IWorkout } from "@/types/work.type";
import Image from "next/image";
import Link from "next/link";
import { useContext, useMemo, useState } from "react";

type Tab = "plan" | "saved";
type SortBy = "duration" | "name" | "calories";

const MyPlan = () => {
  const context = useContext(WorksContext);

  if (!context) {
    throw new Error("MyPlan must be rendered inside WorksProvider");
  }

  const {
    addPlan,
    saveLater,
    completedPlanIds,
    removeFromPlan,
    removeFromSaved,
    markPlanDone,
  } = context;

  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortBy>("duration");

  const currentList = activeTab === "plan" ? addPlan : saveLater;

  const sortedList = useMemo(() => {
    return [...currentList].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
      return a.duration - b.duration;
    });
  }, [currentList, sortBy]);

  const totalMinutes = currentList.reduce(
    (sum, work) => sum + work.duration,
    0,
  );
  const totalCalories = currentList.reduce(
    (sum, work) => sum + work.caloriesBurned,
    0,
  );

  return (
    <main className="container mx-auto px-4 py-8 text-white">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold uppercase">My Plan</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </header>

      <section className="mb-5 grid grid-cols-3 rounded-2xl border border-white/10 bg-[#14171e] p-5">
        <div className="border-r border-white/10">
          <p className="text-xs text-zinc-500">Exercises</p>
          <p className="mt-1 text-3xl font-bold text-lime-400">
            {currentList.length}
          </p>
        </div>
        <div className="border-r border-white/10 pl-5">
          <p className="text-xs text-zinc-500">Minutes</p>
          <p className="mt-1 text-3xl font-bold">{totalMinutes}</p>
        </div>
        <div className="pl-5">
          <p className="text-xs text-zinc-500">Calories</p>
          <p className="mt-1 text-3xl font-bold">{totalCalories}</p>
        </div>
      </section>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#14171e] p-2">
        <div className="flex rounded-lg bg-[#0e1117] p-1">
          <button
            id="plan"
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`rounded-md px-4 py-2 text-xs ${
              activeTab === "plan"
                ? "bg-[#242832] font-semibold text-white"
                : "text-zinc-400"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            id="saved"
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`rounded-md px-4 py-2 text-xs ${
              activeTab === "saved"
                ? "bg-[#242832] font-semibold text-white"
                : "text-zinc-400"
            }`}
          >
            Saved
          </button>
        </div>

        <label className="flex items-center gap-2 pr-1 text-xs text-zinc-400">
          Sort By
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortBy)}
            className="select select-bordered select-sm border-white/10 bg-[#14171e] text-white"
          >
            <option value="duration">Duration</option>
            <option value="name">Name</option>
            <option value="calories">Calories</option>
          </select>
        </label>
      </div>

      {sortedList.length ? (
        <div className="space-y-3">
          {sortedList.map((work: IWorkout) => {
            const isSaved = activeTab === "saved";
            const isDone = completedPlanIds.includes(work.id);

            return (
              <article
                key={work.id}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#14171e] p-3 sm:flex-row sm:items-center"
              >
                <Image
                  src={work.image}
                  alt={work.name}
                  width={160}
                  height={96}
                  className="h-24 w-full rounded-xl object-cover sm:w-32"
                />

                <div className="min-w-0 flex-1">
                  <h2 className="font-bold uppercase">{work.name}</h2>
                  <p className="text-xs text-zinc-500">{work.equipment}</p>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-zinc-300">
                    <span>◷ {work.duration} min</span>
                    <span>♨ {work.caloriesBurned} kcal</span>
                    <span className="text-lime-400">★ {work.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/workouts/${work.id}`}
                    className="btn btn-sm rounded-full border-white/15 bg-transparent text-white"
                  >
                    View Details
                  </Link>

                  {!isSaved && (
                    <button
                      type="button"
                      onClick={() => markPlanDone(work.id)}
                      disabled={isDone}
                      className="btn btn-sm rounded-full border-0 bg-lime-400 text-black hover:bg-lime-300"
                    >
                      ✓ {isDone ? "Done" : "Mark as Done"}
                    </button>
                  )}

                  <button
                    type="button"
                    aria-label={`Remove ${work.name}`}
                    onClick={() =>
                      isSaved
                        ? removeFromSaved(work.id)
                        : removeFromPlan(work.id)
                    }
                    className="btn btn-ghost btn-sm text-zinc-500 hover:text-white"
                  >
                    ×
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#14171e] px-5 text-center">
          <h2 className="font-bold uppercase">Nothing Here Yet</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/workouts"
            className="btn btn-sm mt-5 rounded-full border-0 bg-lime-400 px-6 text-black hover:bg-lime-300"
          >
            Go to workouts
          </Link>
        </div>
      )}
    </main>
  );
};

export default MyPlan;
