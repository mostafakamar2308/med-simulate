import { Text, View } from "react-native";
import React from "react";
import { Activity, Droplets, HeartPulse, Wind } from "lucide-react-native";

const SimulationVitals = () => {
  return (
    <View className="w-full border-t border-gray-300 bg-white/90 p-4 shadow-lg">
      <View className="flex flex-row items-center justify-between">
        <View className="flex w-1/4 flex-col items-center gap-3">
          <View className="flex flex-row items-center gap-2">
            <Activity className="h-4 w-4" color={"#3b82f6"} />
            <Text className="text-base font-bold uppercase text-blue-500">BP</Text>
          </View>
          <Text className="font-mono text-lg font-bold leading-none text-gray-900">120/80</Text>
        </View>

        <View className="h-8 w-px bg-gray-300" />

        <View className="flex w-1/4 flex-col items-center gap-3">
          <View className="flex flex-row items-center gap-2">
            <HeartPulse className="h-4 w-4 text-rose-500" color={"#f43f5e"} />
            <Text className="text-base font-bold uppercase text-rose-500">HR</Text>
          </View>
          <Text className="font-mono text-lg font-bold leading-none text-gray-900">88</Text>
        </View>

        <View className="h-8 w-px bg-gray-300" />

        <View className="flex w-1/4 flex-col items-center gap-3">
          <View className="flex flex-row items-center gap-2">
            <Wind className="h-4 w-4 text-sky-500" color={"#0ea5e9"} />
            <Text className="text-base font-bold uppercase text-sky-500">RR</Text>
          </View>
          <Text className="font-mono text-lg font-bold leading-none text-gray-900">16</Text>
        </View>

        <View className="h-8 w-px bg-gray-300" />

        <View className="flex w-1/4 flex-col items-center gap-3">
          <View className="flex flex-row items-center gap-2">
            <Droplets className="h-4 w-4 text-indigo-500" color={"#6366f1"} />
            <Text className="text-base font-bold uppercase text-indigo-500">Sat</Text>
          </View>
          <Text className="font-mono text-lg font-bold leading-none text-gray-900">98%</Text>
        </View>
      </View>
    </View>
  );
};

export default SimulationVitals;
