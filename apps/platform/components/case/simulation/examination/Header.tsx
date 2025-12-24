import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Text, View, Pressable } from "react-native";
import { ChevronLeft, X } from "lucide-react-native";
import React from "react";

const ExaminationSuiteHeader: React.FC<{
  complaint: string;
  onTechnique: boolean;
  reset: () => void;
}> = ({ complaint, onTechnique, reset }) => {
  return (
    <DialogHeader className="z-10 border-b bg-white/80 p-4 shadow-sm backdrop-blur-md">
      <DialogTitle className="flex items-center justify-between gap-3">
        <View>
          {onTechnique ? (
            <Pressable onPress={reset}>
              <ChevronLeft className="h-8 w-8" />
            </Pressable>
          ) : null}
        </View>

        <View>
          <Text className="font-display text-lg font-bold text-foreground">
            Physical Examination
          </Text>
          <Text className="text-sm text-muted-foreground">{complaint}</Text>
        </View>
        <DialogClose>
          <X />
        </DialogClose>
      </DialogTitle>
    </DialogHeader>
  );
};

export default ExaminationSuiteHeader;
