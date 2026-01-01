import { useRouter } from "expo-router";
import { ChevronLeft, Clock } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import StartSimulationButton from "@/components/case/introduction/StartSimulationButton";

const CaseHeader: React.FC<{ title?: string; start: () => void }> = ({ title, start }) => {
  const router = useRouter();

  const goBack = React.useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <View className="mb-6 flex-row justify-between">
      <View>
        <View className="flex flex-row items-center gap-2">
          <Pressable className="!p-0" onPress={goBack}>
            <ChevronLeft strokeWidth={3} className="!h-7 !w-7 text-foreground" />
          </Pressable>
          <Text className="font-display relative z-10 text-2xl font-bold text-foreground">
            {title}
          </Text>
        </View>
        <View className="mt-2 flex flex-row items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <Text className="text-sm">Est. 10-15 mins</Text>
        </View>
      </View>
      <StartSimulationButton onClick={start} />
    </View>
  );
};

export default CaseHeader;
