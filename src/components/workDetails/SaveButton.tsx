"use client";
import { WorksContext } from "@/context/WorksContext";
import { IWorkout } from "@/types/work.type";
import React, { useContext } from "react";

const SaveButton = ({ work }: { work: IWorkout }) => {
  const { saveLater, setSaveLater } = useContext(WorksContext);

  console.log(saveLater, "addPlan");

  const handleAddToSaveButton = () => {
    console.log("add button triggered", work);
    setSaveLater([...saveLater, work]);
    alert(`You have added "${work.name}"`);
  };

  return (
    <button
      className="btn btn-outline"
      onClick={() => handleAddToSaveButton()}
    >
      Save for later
    </button>
  );
};

export default SaveButton;
