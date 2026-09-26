// "use client";
// import { WorksContext } from "@/context/WorksContext";
// import { IWorkout } from "@/types/work.type";
// import React, { useContext } from "react";
// import { toast } from "react-toastify";

// const SaveButton = ({ work }: { work: IWorkout }) => {
//   const { saveLater, setSaveLater } = useContext(WorksContext);

//   console.log(saveLater, "addPlan");

//   // const handleAddToSaveButton = () => {
//   //   console.log("add button triggered", work);
//   //   setSaveLater([...saveLater, work]);
//   //   toast.success(`You have saved "${work.name}"`);
//   // };

//   //updated
//   const handleAddToSaveButton = () => {
//     const alreadySaved = saveLater.some((work) => work.id === work.id);

//     if (alreadySaved) {
//       toast.info(`"${work.name}" is already saved`);
//       return;
//     }

//     //setSaveLater((current) => [...current, work]);
//     setSaveLater([...saveLater, work]);
//     toast.success(`You have saved "${work.name}"`);
//   };

//   return (
//     <button className="btn btn-outline" onClick={() => handleAddToSaveButton()}>
//       Save for later
//     </button>
//   );
// };

// export default SaveButton;

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
      <CiBookmark size={16}  aria-hidden="true" />
      Save for later
    </button>
  );
};

export default SaveButton;
