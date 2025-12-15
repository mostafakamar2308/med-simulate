import PatientDetails from "@/components/case/PatientDetails";
import CaseHeader from "@/components/case/Header";
import Loading from "@/components/Loading";
import { useFindCaseById } from "@med-simulate/api/hooks";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import ScenarioDetails from "@/components/case/ScenarioDetails";

const Screen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { data, isPending } = useFindCaseById({ id });
  console.log(data);

  if (isPending || data === undefined) return <Loading text="Loading Case..." />;

  if (data === null) {
    router.push("/");
    return;
  }

  return (
    <View className="px-4 py-6">
      <CaseHeader title={data.title} />
      <PatientDetails medicalCase={data} />
      <ScenarioDetails medicalCase={data} />
    </View>
  );
};

export default Screen;
