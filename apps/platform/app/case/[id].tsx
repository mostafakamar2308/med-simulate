import Loading from "@/components/Loading";
import { useFindCaseById } from "@med-simulate/api/hooks";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import Simulation from "@/components/case/simulation";
import CaseIntroduction from "@/components/case/introduction";

type Step = "intro" | "simulation";

const Screen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [step, setStep] = useState<Step>("intro");

  const { data, isPending } = useFindCaseById({ id });
  console.log(data);

  const startSimulation = useCallback(() => {
    setStep("simulation");
  }, []);

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
        ) : (
          <Simulation />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Screen;
