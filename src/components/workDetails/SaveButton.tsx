"use client";

import { useContext } from "react";
import { WorksContext } from "@/context/WorksContext";
import { IWorkout } from "@/types/work.type";
import { CiBookmark } from "react-icons/ci";

const SaveButton = ({ work }: { work: IWorkout }) => {
  const context = useContext(WorksContext);

  if (!context) {
    throw new Error("SaveButton must be rendered inside WorksProvider");
  }

  return (
    <button
      type="button"
      className="btn btn-outline"
      onClick={() => context.addWorkoutToSaved(work)}
    >
      <CiBookmark size={16} aria-hidden="true" />
      Save for later
    </button>
  );
};

export default SaveButton;
