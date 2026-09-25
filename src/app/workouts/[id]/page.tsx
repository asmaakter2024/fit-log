import { IWorkout } from "@/types/work.type";
import Image from "next/image";
import React from "react";

interface IWorkDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const getWorkouts = async () => {
  const response = await fetch("https://api.abcz.workers.dev/api/fitlog");
  const data = await response.json();

  return data;
};

const WorkDetailsPage = async ({ params }: IWorkDetailsPageProps) => {
  const { id } = await params;
  const workOutData = await getWorkouts();
  const work = workOutData.find(
    (work: IWorkout) => String(work.id) === String(id),
  );
  console.log(work, "work");
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card lg:card-side overflow-hidden border border-base-300 bg-base-100 shadow-xl">
        <figure className="relative min-h-80 lg:w-1/2">
          <Image
            src={work.image}
            alt={work.name}
            width={500}
            height={300}
            className="h-full w-full object-cover"
          />
        </figure>

        <div className="card-body gap-5 lg:w-1/2">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              {work.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="badge bg-[#CCFF00] text-black font-medium"
                >
                  {muscle}
                </span>
              ))}
            </div>

            <h2 className="card-title text-3xl font-bold">{work.name}</h2>
            <p className="mt-2 text-base-content/70">{work.description}</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-base-300 bg-[#151923]">
            {[
              ["Equipment", work.equipment],
              ["Difficulty", work.difficulty],
              ["Sets", String(work.sets)],
              ["Reps", work.reps],
              ["Duration", `${work.duration} min`],
              ["Calories", `${work.caloriesBurned} kcal`],
              ["Rating", work.rating.toFixed(1)],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between border-b border-base-300/70 px-5 py-3.5 last:border-b-0"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-base-content/60">
                  {label}
                </span>
                <span className="text-sm text-base-content/90">{value}</span>
              </div>
            ))}
          </div>

          <div>
            <h3 className="mb-3 font-bold uppercase tracking-wide">
              Instructions
            </h3>
            <ol className="space-y-2">
              {work.instructions.map((instruction, index) => (
                <li
                  key={`${index}-${instruction}`}
                  className="flex gap-3 text-sm"
                >
                  <span className="font-semibold text-white">{index + 1}.</span>
                  <span className="text-base-content/80">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="card-actions justify-end">
            <button className="btn bg-[#CCFF00] text-black font-medium">
              Add to today’s plan
            </button>
            <button className="btn btn-outline">Save for later</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkDetailsPage;
