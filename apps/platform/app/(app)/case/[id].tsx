import Loading from "@/components/Loading";
import { useFindCaseById } from "@med-simulate/api/hooks";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useCallback } from "react";
import { View } from "react-native";
import Simulation from "@/components/case/simulation";
import CaseIntroduction from "@/components/case/introduction";
import Feedback from "@/components/case/simulation/feedback";
import { FinishSimulation } from "@/components/case/simulation/SimulationActions";

type Step = "intro" | "simulation" | "feedback";

const Screen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [step, setStep] = useState<Step>("intro");

  const { data, isPending } = useFindCaseById({ id });

  const startSimulation = useCallback(() => {
    setStep("simulation");
  }, []);

  const completeSimulation = useCallback(() => {
    setStep("feedback");
  }, []);

  const finishSimulation: FinishSimulation = useCallback((payload) => {}, []);

  if (isPending || data === undefined) return <Loading text="Loading Case..." />;

  if (data === null) {
    router.push("/");
    return;
  }

  return (
    <View className="relative flex-1">
      {step === "intro" ? <CaseIntroduction data={data} startSimulation={startSimulation} /> : null}
      {step === "simulation" ? (
        <Simulation finishSimulation={finishSimulation} caseData={data} />
      ) : null}
      {step === "feedback" ? <Feedback /> : null}
    </View>
  );
};

export default Screen;
