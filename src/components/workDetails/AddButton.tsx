// "use client";
// import { WorksContext } from "@/context/WorksContext";
// import { IWorkout } from "@/types/work.type";
// import React, { useContext } from "react";
// import { toast } from "react-toastify";

// const AddButton = ({ work }: { work: IWorkout }) => {
//   const { addPlan, setAddPlan } = useContext(WorksContext);

//   //console.log(addPlan, "addPlan");

//   // const handleAddButton = () => {
//   //   console.log("add button triggered", work);
//   //   setAddPlan([...addPlan, work]);
//   //   toast.success(`You have added "${work.name}" to your plan`);
//   // };

//   //updated
//   const handleAddButton = () => {
//     const alreadyAdded = addPlan.some((work) => work.id === work.id);

//     if (alreadyAdded) {
//       toast.info(`"${work.name}" is already in your plan`);
//       return;
//     }

//     //setAddPlan((current) => [...current, work]);
//     setAddPlan([...addPlan, work]);
//     toast.success(`You have added "${work.name}" to your plan`);
//   };

//   return (
//     <button
//       className="btn bg-[#CCFF00] text-black font-medium"
//       onClick={() => handleAddButton()}
//     >
//       Add to today’s plan
//     </button>
//   );
// };

// export default AddButton;

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