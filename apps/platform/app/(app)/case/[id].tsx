import Loading from "@/components/Loading";
import { useFindCaseById } from "@med-simulate/api/hooks";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useCallback } from "react";
import { View } from "react-native";
import Simulation from "@/components/case/simulation";
import CaseIntroduction from "@/components/case/introduction";

type Step = "intro" | "simulation";

const Screen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [step, setStep] = useState<Step>("intro");

  const { data, isPending } = useFindCaseById({ id });

  const startSimulation = useCallback(() => {
    setStep("simulation");
  }, []);

  if (isPending || data === undefined) return <Loading text="Loading Case..." />;

  if (data === null) {
    router.push("/");
    return;
  }

  return (
    <View className="relative flex-1">
      {step === "intro" ? (
        <CaseIntroduction data={data} startSimulation={startSimulation} />
      ) : (
        <Simulation caseData={data} />
      )}
    </View>
  );
};

export default Screen;
