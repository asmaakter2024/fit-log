import { IWorkout } from "@/types/work.type";
import Image from "next/image";
import React from "react";

interface IWorkCardProps {
  work: IWorkout;
}

const WorkoutCard = ({ work }: { IWorkCardProps }) => {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#191a21] transition hover:-translate-y-1 hover:border-lime-400/50">
      <Image
        src={work.image}
        alt={work.name}
        width={400}
        height={600}
        className="aspect-[16/10] w-full object-cover"
      />

      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {work.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-lime-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-black"
            >
              {group}
            </span>
          ))}
        </div>

        <h2 className="text-lg font-extrabold uppercase tracking-wide">
          {work.name}
        </h2>

        <p className="mt-1 text-sm text-white/55">{work.equipment}</p>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/70">
          <span>◷ {work.duration} min</span>
          <span>♥ {work.caloriesBurned} kcal</span>
          <span>☆ {work.rating}</span>
        </div>
      </div>
    </article>
  );
};

export default WorkoutCard;
