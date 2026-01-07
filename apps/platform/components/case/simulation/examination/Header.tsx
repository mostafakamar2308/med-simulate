import { DialogHeader } from "@/components/ui/dialog";
import { Text, View, Pressable } from "react-native";
import { ChevronLeft, X } from "lucide-react-native";
import React from "react";

const ExaminationSuiteHeader: React.FC<{
  complaint: string;
  onTechnique: boolean;
  reset: () => void;
  close: () => void;
}> = ({ complaint, onTechnique, reset, close }) => {
  return (
    <DialogHeader className="z-10 flex-row items-center justify-between border-b bg-white/80 p-4 shadow-sm backdrop-blur-md">
      {onTechnique ? (
        <View>
          <Pressable onPress={reset}>
            <ChevronLeft size={32} />
          </Pressable>
        </View>
      ) : null}

      <View>
        <Text className="font-display text-lg font-bold text-foreground">Physical Examination</Text>
        <Text className="text-sm text-muted-foreground">{complaint}</Text>
      </View>
      <Pressable onPress={close}>
        <X width={32} height={32} />
      </Pressable>
    </DialogHeader>
  );
};

export default ExaminationSuiteHeader;
