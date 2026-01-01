import { cn } from "@/lib/utils";
import { getSystemLabel, TECHNIQUES } from "@/lib/examination";
import { Button } from "@/components/ui/button";
import { Text, View } from "react-native";
import React from "react";
import ExaminationActionSelector from "@/components/case/simulation/examination/ExaminationActionSelector";
import { BodySystem, ExaminationTechniqueType } from "@med-simulate/types";

type TechniqueSelectorProps = {
  selectedTechnique: ExaminationTechniqueType | null;
  selectedSystem: BodySystem;
  onChange: (technique: ExaminationTechniqueType | "special") => void;
};

export function TechniqueSelector({
  selectedTechnique,
  selectedSystem,
  onChange,
}: TechniqueSelectorProps) {
  return (
    <View className="my-4 flex w-full items-center gap-3 px-2">
      <Text className="flex flex-row gap-2 text-2xl font-semibold text-foreground">
        {getSystemLabel(selectedSystem).icon} {getSystemLabel(selectedSystem).label}
      </Text>
      <View className="my-4 flex flex-row flex-wrap gap-3 px-2">
        {TECHNIQUES.map((tech) => {
          const Icon = tech.icon;
          const isSelected = selectedTechnique === tech.id;
          return (
            <Button
              key={tech.id}
              onPress={() => onChange(tech.id)}
              className={cn(
                "flex h-fit w-[44%] flex-col items-center justify-center gap-2 rounded-2xl p-3",
                isSelected
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "border border-border bg-white"
              )}>
              <Icon className="h-6 w-6" />
              <Text className="font-display text-sm font-bold">{tech.label}</Text>
              <Text className="w-full text-center text-sm opacity-75">{tech.description}</Text>
            </Button>
          );
        })}
      </View>
      {selectedTechnique && selectedSystem ? (
        <ExaminationActionSelector
          selectedSystem={selectedSystem}
          selectedTechnique={selectedTechnique}
        />
      ) : null}
    </View>
  );
}
