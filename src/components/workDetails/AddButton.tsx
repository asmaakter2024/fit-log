"use client";

import { useContext } from "react";
import { WorksContext } from "@/context/WorksContext";
import { IWorkout } from "@/types/work.type";
import { CiCalendarDate } from "react-icons/ci";

const AddButton = ({ work }: { work: IWorkout }) => {
  const context = useContext(WorksContext);

  if (!context) {
    throw new Error("AddButton must be rendered inside WorksProvider");
  }

  return (
    <button
      type="button"
      className="btn bg-[#CCFF00] font-medium text-black"
      onClick={() => context.addWorkoutToPlan(work)}
    >
      <CiCalendarDate size={16} aria-hidden="true" />
      Add to today’s plan
    </button>
  );
};

export default AddButton;
