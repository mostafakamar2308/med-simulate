import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { ChevronLeft, Clock } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

const CaseHeader: React.FC<{ title?: string }> = ({ title }) => {
  const router = useRouter();

  const goBack = React.useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <View className="relative mb-6">
      <View className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-primary/40 blur-3xl" />
      <View className="flex flex-row items-center gap-2">
        <Button variant={"link"} className="!p-0" onPress={goBack}>
          <ChevronLeft strokeWidth={3} className="!h-7 !w-7 text-foreground" />
        </Button>
        <Text className="font-display relative z-10 text-2xl font-bold text-foreground">
          {title}
        </Text>
      </View>
      <View className="mt-2 flex flex-row items-center gap-2 text-muted-foreground">
        <Clock className="h-4 w-4" />
        <Text className="text-sm">Est. 10-15 mins</Text>
      </View>
    </View>
  );
};

export default CaseHeader;
