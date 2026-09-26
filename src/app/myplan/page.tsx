// // "use client";
// // import WorkoutCard from "@/components/shared/WorkoutCard";
// // import { WorksContext } from "@/context/WorksContext";
// // import { IWorkout } from "@/types/work.type";
// // import React, { useContext } from "react";

// // const MyPlan = () => {
// //   const { addPlan, saveLater } = useContext(WorksContext);
// //   console.log(addPlan, saveLater, "addPlan", "saveLater");
// //   return (
// //     <div className="container mx-auto py-[60px]">
// //       <h2 className="my-4 bg-amber-100 rounded-3xl py-16 font-bold text-4xl text-black text-center">
// //         My Plan
// //       </h2>
// //       {/* name of each tab group should be unique */}
// //       <div className="tabs tabs-border">
// //         <input
// //           type="radio"
// //           name="my_tabs_2"
// //           className="tab"
// //           aria-label="Today's Plan"
// //         />
// //         <div className="tab-content border-base-300 bg-base-100 p-10">
// //           {addPlan.length > 0 ? (
// //             addPlan.map((work: IWorkout) => {
// //               return <WorkoutCard key={work.id} work={work} />;
// //             })
// //           ) : (
// //             <div className="text-center">
// //               <h5 className=" text-lg font-semibold uppercase">
// //                 Nothing Here Yet
// //               </h5>
// //               <p>Browse the library and add a lift to get today moving.</p>
// //               <button className="btn  bg-[#C2F10D] text-black">
// //                 Go to workouts
// //               </button>
// //             </div>
// //           )}
// //         </div>

// //         <input
// //           type="radio"
// //           name="my_tabs_2"
// //           className="tab"
// //           aria-label="Saved"
// //           defaultChecked
// //         />
// //         <div className="tab-content border-base-300 bg-base-100 p-10">
// //           {saveLater.length > 0 ? (
// //             saveLater.map((work: IWorkout) => {
// //               return <WorkoutCard key={work.id} work={work} />;
// //             })
// //           ) : (
// //             <div className="text-center">
// //               <h5 className=" text-lg font-semibold uppercase">
// //                 Nothing Here Yet
// //               </h5>
// //               <p>Browse the library and add a lift to get today moving.</p>
// //               <button className="btn  bg-[#C2F10D] text-black">
// //                 Go to workouts
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MyPlan;

// "use client";

// import { WorksContext } from "@/context/WorksContext";
// import { IWorkout } from "@/types/work.type";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useContext, useMemo, useState } from "react";

// type TabName = "today" | "saved";
// type SortOption = "duration" | "name" | "calories";

// const page = () => {
//   const { addPlan, saveLater } = useContext(WorksContext);
//   const [activeTab, setActiveTab] = useState<TabName>("today");
//   const [sortBy, setSortBy] = useState<SortOption>("duration");

//   const workouts = activeTab === "today" ? addPlan : saveLater;

//   const sortedWorkouts = useMemo(() => {
//     return [...workouts].sort((a, b) => {
//       if (sortBy === "name") return a.name.localeCompare(b.name);
//       if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
//       return a.duration - b.duration;
//     });
//   }, [workouts, sortBy]);

//   const totalMinutes = addPlan.reduce(
//     (total, work) => total + work.duration,
//     0,
//   );

//   const totalCalories = addPlan.reduce(
//     (total, work) => total + work.caloriesBurned,
//     0,
//   );

//   return (
//     <main className="container mx-auto px-4 py-10">
//       <header className="mb-6">
//         <h1 className="text-3xl font-extrabold uppercase tracking-tight">
//           My Plan
//         </h1>
//         <p className="mt-1 text-sm text-base-content/60">
//           Cap of five lifts for today. Finish them, then load more.
//         </p>
//       </header>

//       <section className="mb-6 grid grid-cols-1 gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 sm:grid-cols-3">
//         <div className="sm:border-r sm:border-base-300">
//           <p className="text-xs text-base-content/50">Exercises</p>
//           <p className="mt-1 text-3xl font-bold text-primary">
//             {addPlan.length}
//           </p>
//         </div>

//         <div className="sm:border-r sm:border-base-300 sm:pl-5">
//           <p className="text-xs text-base-content/50">Minutes</p>
//           <p className="mt-1 text-3xl font-bold">{totalMinutes}</p>
//         </div>

//         <div className="sm:pl-5">
//           <p className="text-xs text-base-content/50">Calories</p>
//           <p className="mt-1 text-3xl font-bold">{totalCalories}</p>
//         </div>
//       </section>

//       <section>
//         <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-base-300 bg-base-100 p-2">
//           <div role="tablist" className="tabs tabs-box">
//             <button
//               type="button"
//               role="tab"
//               aria-selected={activeTab === "today"}
//               onClick={() => setActiveTab("today")}
//               className={`tab ${activeTab === "today" ? "tab-active" : ""}`}
//             >
//               Today&apos;s Plan
//             </button>

//             <button
//               type="button"
//               role="tab"
//               aria-selected={activeTab === "saved"}
//               onClick={() => setActiveTab("saved")}
//               className={`tab ${activeTab === "saved" ? "tab-active" : ""}`}
//             >
//               Saved
//             </button>
//           </div>

//           <label className="flex items-center gap-2 pr-1 text-xs text-base-content/60">
//             Sort By
//             <select
//               className="select select-bordered select-sm"
//               value={sortBy}
//               onChange={(event) => setSortBy(event.target.value as SortOption)}
//             >
//               <option value="duration">Duration</option>
//               <option value="name">Name</option>
//               <option value="calories">Calories</option>
//             </select>
//           </label>
//         </div>

//         {sortedWorkouts.length > 0 ? (
//           <div className="space-y-3">
//             {sortedWorkouts.map((work: IWorkout) => (
//               <WorkoutRow key={work.id} work={work} />
//             ))}
//           </div>
//         ) : (
//           <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 px-5 py-12 text-center">
//             <h2 className="text-lg font-bold uppercase">Nothing Here Yet</h2>
//             <p className="mt-2 text-sm text-base-content/60">
//               Browse the library and add a lift to get today moving.
//             </p>
//             <Link href="/workouts" className="btn btn-primary btn-sm mt-5">
//               Go to workouts
//             </Link>
//           </div>
//         )}
//       </section>
//     </main>
//   );
// };

// function WorkoutRow({ work }: { work: IWorkout }) {
//   return (
//     <article className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-3 sm:flex-row sm:items-center">
//       <Image
//         src={work.image}
//         alt={work.name}
//         width={160}
//         height={96}
//         className="h-24 w-full rounded-xl object-cover sm:w-40"
//       />

//       <div className="min-w-0 flex-1">
//         <h2 className="font-bold uppercase">{work.name}</h2>
//         <p className="mt-1 text-xs text-base-content/50">{work.equipment}</p>

//         <div className="mt-2 flex flex-wrap gap-3 text-xs text-base-content/70">
//           <span>◷ {work.duration} min</span>
//           <span>♨ {work.caloriesBurned} kcal</span>
//           <span>★ {work.rating}</span>
//         </div>
//       </div>

//       <Link
//         href={`/workouts/${work.id}`}
//         className="btn btn-outline btn-sm sm:mr-2"
//       >
//         View Details
//       </Link>
//     </article>
//   );
// }

// export default page;

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

  const totalMinutes = currentList.reduce((sum, work) => sum + work.duration, 0);
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
