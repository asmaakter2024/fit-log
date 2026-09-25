"use client";
import React, { ReactNode, useState } from "react";
import { createContext } from "react";

 export const WorksContext = createContext({});

const WorksProvider = ({ children }: { children: ReactNode }) => {
  const [addPlan, setAddPlan] = useState([]);
  const [saveLater, setSaveLater] = useState([]);

  const sharedData = {
    addPlan,
    setAddPlan,
    saveLater,
    setSaveLater,
  };

  return (
    <WorksContext.Provider value={sharedData}>{children}</WorksContext.Provider>
  );
};

export default WorksProvider;
