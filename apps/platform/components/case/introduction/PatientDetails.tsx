import PatientAvatar from "@/components/case/PatientAvatar";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { genderMap } from "@/lib/constants";
import { ICase } from "@med-simulate/types";
import { AlertCircle } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

const PatientDetails: React.FC<{ medicalCase: ICase.FullCase }> = ({ medicalCase }) => {
  return (
    <Card className="relative mb-6 gap-3 overflow-hidden border-none bg-white p-6 shadow-lg">
      <View className="relative z-10 mb-2 flex flex-row items-center gap-6">
        <View className="relative h-20 w-20">
          <PatientAvatar />
        </View>
        <View>
          <Text className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Patient
          </Text>
          <Text className="font-display mb-1 text-2xl font-bold leading-none text-foreground">
            {medicalCase.name}
          </Text>
          <Text className="text-sm text-muted-foreground">
            {medicalCase.age}y • {genderMap[medicalCase.gender]}
          </Text>
        </View>
      </View>

      <View className="flex flex-row items-start gap-3 rounded-xl border border-secondary bg-secondary/30 p-3">
        <View>
          <AlertCircle className="mt-0.5 h-6 w-6 text-destructive" />
        </View>
        <View className="flex-1 gap-2">
          <Text className="text-xs font-bold uppercase text-destructive">Chief Complaint</Text>
          <Text className="shrink font-medium leading-5 text-foreground">
            {medicalCase.complaint}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default PatientDetails;
