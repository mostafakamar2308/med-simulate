import { DialogHeader } from "@/components/ui/dialog";
import { Text, View, Pressable } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import React from "react";

const ExaminationSuiteHeader: React.FC<{
  complaint: string;
  onTechnique: boolean;
  reset: () => void;
}> = ({ complaint, onTechnique, reset }) => {
  return (
    <DialogHeader className="z-10 border-b bg-white/80 p-4 shadow-sm backdrop-blur-md">
      <View className="flex flex-row items-center gap-3">
        {onTechnique ? (
          <View>
            <Pressable onPress={reset}>
              <ChevronLeft size={32} />
            </Pressable>
          </View>
        ) : null}

        <View>
          <Text className="font-display text-lg font-bold text-foreground">
            Physical Examination
          </Text>
          <Text className="text-sm text-muted-foreground">{complaint}</Text>
        </View>
      </View>
    </DialogHeader>
  );
};

export default ExaminationSuiteHeader;
