import React from "react";
import { ICase } from "@med-simulate/types";
import PatientDetails from "@/components/case/introduction/PatientDetails";
import CaseHeader from "@/components/case/introduction/Header";
import StartSimulationButton from "@/components/case/introduction/StartSimulationButton";
import ScenarioDetails from "@/components/case/introduction/ScenarioDetails";

const CaseIntroduction: React.FC<{ data: ICase.Self; startSimulation: () => void }> = ({
  data,
  startSimulation,
}) => {
  return (
    <>
      <CaseHeader title={data.title} />
      <PatientDetails medicalCase={data} />
      <ScenarioDetails medicalCase={data} />
      <StartSimulationButton onClick={startSimulation} />
    </>
  );
};

export default CaseIntroduction;
