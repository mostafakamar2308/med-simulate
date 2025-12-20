import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React from "react";
import { Text, View } from "react-native";
import PatientAvatar from "@/components/case/PatientAvatar";
import { X } from "lucide-react-native";

const HistoryHeader: React.FC<{ patientName: string }> = ({ patientName }) => {
  return (
    <DialogHeader className="z-10 border-b bg-white/80 p-4 shadow-sm backdrop-blur-md">
      <DialogTitle className="flex items-center justify-between gap-3">
        <View className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <PatientAvatar />
        </View>
        <View className="flex-1">
          <Text className="font-display block text-lg">{patientName}</Text>
          <Text className="flex items-center gap-1 text-xs font-medium text-green-600">
            <Text className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500"></Text>
            Online
          </Text>
        </View>
        <DialogClose>
          <X />
        </DialogClose>
      </DialogTitle>
    </DialogHeader>
  );
};

export default HistoryHeader;
