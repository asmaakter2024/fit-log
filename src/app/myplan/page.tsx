"use client";
import { WorksContext } from "@/context/WorksContext";
import React, { useContext } from "react";

const MyPlan = () => {
  const { addPlan } = useContext(WorksContext);
  console.log(addPlan, "addPlan");
  return <div>My plan page</div>;
};

export default MyPlan;
