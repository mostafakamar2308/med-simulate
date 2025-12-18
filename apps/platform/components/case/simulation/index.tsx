import { View } from "react-native";
import React from "react";
import SimulationVitals from "@/components/case/simulation/SimulationVitals";
import PatientAvatar from "@/components/case/PatientAvatar";

const Simulation: React.FC = () => {
  return (
    <View className="relative flex flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="h-40 w-40">
          <PatientAvatar feelings="😣" />
        </View>
      </View>
      <SimulationVitals />
    </View>
  );
};

export default Simulation;
