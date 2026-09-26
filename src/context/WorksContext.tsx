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
