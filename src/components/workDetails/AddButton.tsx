"use client";
import { WorksContext } from "@/context/WorksContext";
import { IWorkout } from "@/types/work.type";
import React, { useContext } from "react";

const AddButton = ({ work }: { work: IWorkout }) => {
  const { addPlan, setAddPlan } = useContext(WorksContext);

  console.log(addPlan, "addPlan");

  const handleAddButton = () => {
    console.log("add button triggered", work);
    setAddPlan([...addPlan, work]);
    alert(`You have added "${work.name}"`);
  };

  return (
    <button
      className="btn bg-[#CCFF00] text-black font-medium"
      onClick={() => handleAddButton()}
    >
      Add to today’s plan
    </button>
  );
};

export default AddButton;
