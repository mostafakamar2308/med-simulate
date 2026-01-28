import React from "react";
import { ICase } from "@med-simulate/types";
import PatientDetails from "@/components/case/introduction/PatientDetails";
import CaseHeader from "@/components/case/introduction/Header";
import ScenarioDetails from "@/components/case/introduction/ScenarioDetails";
import StartSimulationButton from "@/components/case/introduction/StartSimulationButton";

const CaseIntroduction: React.FC<{
  data: ICase.FullCase;
  startSimulation: () => void;
}> = ({ data, startSimulation }) => {
  return (
    <div className="relative mt-4 min-h-screen gap-2 p-2">
      <div className="absolute -left-10 -top-10 -z-10 h-24 w-24 rounded-full bg-primary/20 blur-3xl" />
      <CaseHeader title={data.title} />
      <PatientDetails medicalCase={data} />
      <ScenarioDetails medicalCase={data} />
      <StartSimulationButton onClick={startSimulation} />
    </div>
  );
};

export default CaseIntroduction;
