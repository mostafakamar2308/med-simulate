import { useFindCaseById } from "@med-simulate/api/hooks";
import React, { useState, useCallback } from "react";
import Simulation from "@/components/case/simulation";
import CaseIntroduction from "@/components/case/introduction";
import GradingView from "@/components/case/grading/GradingView";
import { useNavigate, useParams } from "react-router";
import Loading from "@/components/common/loading";
import { IChat, ICase, IGrading } from "@med-simulate/types";
import { FinishSimulationPayload } from "@/components/case/simulation/SimulationActions";

type Step = "intro" | "simulation" | "grading";

const Case: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("intro");
  const [submissionData, setSubmissionData] =
    useState<IGrading.SubmissionData | null>(null);

  // Simulation state (lifted from SimulationActions)
  const [chatMessages, setChatMessages] = useState<IChat.Message[]>([]);

  const [userFindings, setUserFindings] = useState<ICase.UserFinding[]>([]);
  const [investigationsTaken, setInvestigationsTaken] = useState<
    ICase.TakenInvestigation[]
  >([]);

  const { data, isPending } = useFindCaseById({ id: id || "" });

  const startSimulation = useCallback(() => {
    setStep("simulation");
  }, []);

  const addUserFinding = useCallback((finding: ICase.UserFinding) => {
    setUserFindings((prev) => {
      const existingIndex = prev.findIndex((f) => f.areaId === finding.areaId);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = finding;
        return updated;
      }
      return [...prev, finding];
    });
  }, []);

  const finishSimulation = useCallback((payload: FinishSimulationPayload) => {
    setSubmissionData({
      chat: payload.chat,
      examinedAreas: payload.findings,
      orderedInvestigations: payload.investigations,
      diagnosis: payload.diagnosis,
    });
    setStep("grading");
  }, []);

  const handleRetry = useCallback(() => {
    setChatMessages([]);
    setUserFindings([]);
    setInvestigationsTaken([]);
    setUserFindings([]);
    setSubmissionData(null);
    setStep("intro");
  }, []);

  if (isPending || data === undefined)
    return <Loading text="Loading Case..." />;
  if (data.data === null) {
    navigate("/");
    return null;
  }

  return (
    <div className="relative flex flex-col flex-1 h-full min-h-screen max-w-3xl mx-auto">
      {step === "intro" && (
        <CaseIntroduction data={data.data} startSimulation={startSimulation} />
      )}
      {step === "simulation" && (
        <Simulation
          caseData={data.data}
          onFinish={finishSimulation}
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          examinationFindings={userFindings}
          setExaminationFindings={addUserFinding}
          investigationsTaken={investigationsTaken}
          setInvestigationsTaken={setInvestigationsTaken}
        />
      )}
      {step === "grading" && submissionData && (
        <GradingView
          onRetry={handleRetry}
          caseData={data.data}
          submissionData={submissionData}
        />
      )}
    </div>
  );
};

export default Case;
