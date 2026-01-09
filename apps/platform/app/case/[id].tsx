import Loading from "@/components/Loading";
import { useFindCaseById } from "@med-simulate/api/hooks";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
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
    <SafeAreaView className="relative flex-1">
      <ScrollView
        className={`flex-1 px-4 ${step === "intro" ? "py-8" : "pt-4"}`}
        contentContainerClassName="flex-1">
        {step === "intro" ? (
          <CaseIntroduction data={data} startSimulation={startSimulation} />
        ) : null}
        {step === "simulation" ? (
          <Simulation finishSimulation={finishSimulation} caseData={data} />
        ) : null}
        {step === "feedback" ? <Feedback /> : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Screen;
