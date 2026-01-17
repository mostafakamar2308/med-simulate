import { useFindCaseById } from "@med-simulate/api/hooks";
import React, { useState, useCallback } from "react";
import Simulation from "@/components/case/simulation";
import CaseIntroduction from "@/components/case/introduction";
import Feedback from "@/components/case/simulation/feedback";
import { FinishSimulation } from "@/components/case/simulation/SimulationActions";
import { useNavigate, useParams } from "react-router";
import Loading from "@/components/common/loading";

type Step = "intro" | "simulation" | "feedback";

const Case: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("intro");

  const { data, isPending } = useFindCaseById({ id: id || "" });

  const startSimulation = useCallback(() => {
    setStep("simulation");
  }, []);

  const completeSimulation = useCallback(() => {
    setStep("feedback");
  }, []);

  const finishSimulation: FinishSimulation = useCallback((payload) => {}, []);

  if (isPending || data === undefined)
    return <Loading text="Loading Case..." />;

  if (data === null) {
    navigate("/");
    return;
  }

  return (
    <div className="relative flex flex-col flex-1 h-full min-h-screen max-w-3xl mx-auto">
      {step === "intro" ? (
        <CaseIntroduction data={data} startSimulation={startSimulation} />
      ) : null}
      {step === "simulation" ? (
        <Simulation finishSimulation={finishSimulation} caseData={data} />
      ) : null}
      {step === "feedback" ? <Feedback /> : null}
    </div>
  );
};

export default Case;
