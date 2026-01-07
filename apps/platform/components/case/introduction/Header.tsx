import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

const CaseHeader: React.FC<{ title?: string }> = ({ title }) => {
  const router = useRouter();

  const goBack = React.useCallback(() => router.push("/"), [router]);

  return (
    <View className="flex-row justify-between">
      <View>
        <View className="flex flex-row items-center gap-2">
          <Pressable onPress={goBack}>
            <ChevronLeft strokeWidth={3} width={28} height={28} className="text-foreground" />
          </Pressable>
          <Text className="font-display relative z-10 text-2xl font-bold text-foreground">
            {title}
          </Text>
        </View>
        {/* <View className="mt-2 flex flex-row items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <Text className="text-sm">Est. 10-15 mins</Text>
        </View> */}
      </View>
    </View>
  );
};

export default CaseHeader;
