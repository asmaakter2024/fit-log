// "use client";
// import React, { ReactNode, useState } from "react";
// import { createContext } from "react";

//  export const WorksContext = createContext({});

// const WorksProvider = ({ children }: { children: ReactNode }) => {
//   const [addPlan, setAddPlan] = useState([]);
//   const [saveLater, setSaveLater] = useState([]);

//   const sharedData = {
//     addPlan,
//     setAddPlan,
//     saveLater,
//     setSaveLater,
//   };

//   return (
//     <WorksContext.Provider value={sharedData}>{children}</WorksContext.Provider>
//   );
// };

// export default WorksProvider;

// "use client";

// import {
//   createContext,
//   ReactNode,
//   useCallback,
//   useMemo,
//   useState,
// } from "react";
// import { IWorkout } from "@/types/work.type";

// type WorksContextType = {
//   addPlan: IWorkout[];
//   saveLater: IWorkout[];
//   completedPlanIds: number[];
//   addWorkoutToPlan: (work: IWorkout) => void;
//   addWorkoutToSaved: (work: IWorkout) => void;
//   removeFromPlan: (id: number) => void;
//   removeFromSaved: (id: number) => void;
//   markPlanDone: (id: number) => void;
//   showToast: (message: string) => void;
//   toastMessage: string;
// };

// export const WorksContext = createContext<WorksContextType | null>(null);

// const WorksProvider = ({ children }: { children: ReactNode }) => {
//   const [addPlan, setAddPlan] = useState<IWorkout[]>([]);
//   const [saveLater, setSaveLater] = useState<IWorkout[]>([]);
//   const [completedPlanIds, setCompletedPlanIds] = useState<number[]>([]);
//   const [toastMessage, setToastMessage] = useState("");

//   const showToast = useCallback((message: string) => {
//     setToastMessage(message);
//     window.setTimeout(() => setToastMessage(""), 2500);
//   }, []);

//   const addWorkoutToPlan = useCallback(
//     (work: IWorkout) => {
//       if (addPlan.some((item) => item.id === work.id)) {
//         showToast("এই workout-টি Today's Plan-এ আগে থেকেই আছে");
//         return;
//       }

//       setAddPlan((current) => [...current, work]);
//       showToast("Workout Today's Plan-এ যোগ হয়েছে");
//     },
//     [addPlan, showToast],
//   );

//   const addWorkoutToSaved = useCallback(
//     (work: IWorkout) => {
//       if (saveLater.some((item) => item.id === work.id)) {
//         showToast("এই workout-টি Saved-এ আগে থেকেই আছে");
//         return;
//       }

//       setSaveLater((current) => [...current, work]);
//       showToast("Workout Saved-এ যোগ হয়েছে");
//     },
//     [saveLater, showToast],
//   );

//   const removeFromPlan = (id: number) => {
//     setAddPlan((current) => current.filter((work) => work.id !== id));
//     setCompletedPlanIds((current) => current.filter((workId) => workId !== id));
//     showToast("Workout Today's Plan থেকে মুছে ফেলা হয়েছে");
//   };

//   const removeFromSaved = (id: number) => {
//     setSaveLater((current) => current.filter((work) => work.id !== id));
//     showToast("Workout Saved থেকে মুছে ফেলা হয়েছে");
//   };

//   const markPlanDone = (id: number) => {
//     setCompletedPlanIds((current) =>
//       current.includes(id) ? current : [...current, id],
//     );
//     showToast("Workout সম্পন্ন হয়েছে");
//   };

//   const value = useMemo(
//     () => ({
//       addPlan,
//       saveLater,
//       completedPlanIds,
//       addWorkoutToPlan,
//       addWorkoutToSaved,
//       removeFromPlan,
//       removeFromSaved,
//       markPlanDone,
//       showToast,
//       toastMessage,
//     }),
//       [
//       addPlan,
//       saveLater,
//       completedPlanIds,
//       addWorkoutToPlan,
//       addWorkoutToSaved,
//       toastMessage,
//     ],
//   );

//   return (
//     <WorksContext.Provider value={value}>{children}</WorksContext.Provider>
//   );
// };

// export default WorksProvider;

"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import { IWorkout } from "@/types/work.type";

type WorksContextType = {
  addPlan: IWorkout[];
  saveLater: IWorkout[];
  completedPlanIds: number[];
  addWorkoutToPlan: (work: IWorkout) => void;
  addWorkoutToSaved: (work: IWorkout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markPlanDone: (id: number) => void;
  showToast: (message: string) => void;
};

export const WorksContext = createContext<WorksContextType | null>(null);

const WorksProvider = ({ children }: { children: ReactNode }) => {
  const [addPlan, setAddPlan] = useState<IWorkout[]>([]);
  const [saveLater, setSaveLater] = useState<IWorkout[]>([]);
  const [completedPlanIds, setCompletedPlanIds] = useState<number[]>([]);

  const showToast = useCallback((message: string) => {
    toast(message);
  }, []);

  const addWorkoutToPlan = useCallback(
    (work: IWorkout) => {
      if (addPlan.some((item) => item.id === work.id)) {
        showToast(`${work.name} is already in Today's Plan.`);
        return;
      }

      setAddPlan((current) => [...current, work]);
      showToast(`${work.name} added to Today's Plan.`);
    },
    [addPlan, showToast],
  );

  const addWorkoutToSaved = useCallback(
    (work: IWorkout) => {
      if (saveLater.some((item) => item.id === work.id)) {
        showToast(`${work.name} is already in Saved.`);
        return;
      }

      setSaveLater((current) => [...current, work]);
      showToast(`${work.name} saved for later.`);
    },
    [saveLater, showToast],
  );

  const removeFromPlan = useCallback(
    (id: number) => {
      setAddPlan((current) => current.filter((work) => work.id !== id));
      setCompletedPlanIds((current) =>
        current.filter((workId) => workId !== id),
      );
      showToast("Workout removed from today's plan");
    },
    [showToast],
  );

  const removeFromSaved = useCallback(
    (id: number) => {
      setSaveLater((current) => current.filter((work) => work.id !== id));
      showToast("Workout removed from saved");
    },
    [showToast],
  );

  const markPlanDone = useCallback(
    (id: number) => {
      setCompletedPlanIds((current) =>
        current.includes(id) ? current : [...current, id],
      );
      showToast("Workout marked as completed");
    },
    [showToast],
  );

  const value = useMemo(
    () => ({
      addPlan,
      saveLater,
      completedPlanIds,
      addWorkoutToPlan,
      addWorkoutToSaved,
      removeFromPlan,
      removeFromSaved,
      markPlanDone,
      showToast,
    }),
    [
      addPlan,
      saveLater,
      completedPlanIds,
      addWorkoutToPlan,
      addWorkoutToSaved,
      removeFromPlan,
      removeFromSaved,
      markPlanDone,
      showToast,
    ],
  );

  return (
    <WorksContext.Provider value={value}>{children}</WorksContext.Provider>
  );
};

export default WorksProvider;
