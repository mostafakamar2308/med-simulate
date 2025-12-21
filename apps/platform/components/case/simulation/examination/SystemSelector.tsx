import { ScrollView, Text } from "react-native";
import React from "react";

import { cn } from "@/lib/utils";
import { BODY_SYSTEMS, BodySystem } from "@/lib/examination";
import { Button } from "@/components/ui/button";

type SystemSelectorProps = {
  selected: BodySystem | null;
  onChange: (system: BodySystem) => void;
};

const SystemSelector: React.FC<SystemSelectorProps> = ({ selected, onChange }) => {
  return (
    <ScrollView contentContainerClassName="grid grid-cols-2 mt-4 px-2 gap-3 w-full">
      {BODY_SYSTEMS.map((system) => {
        const isSelected = selected === system.id;
        return (
          <Button
            variant={"outline"}
            key={system.id}
            onPress={() => onChange(system.id)}
            className={cn(
              "flex h-fit flex-col items-center justify-center rounded-2xl p-4 text-center transition-all duration-300",
              isSelected
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-2 ring-primary/50"
                : "border border-border bg-white"
            )}>
            <Text className="mb-2 text-3xl">{system.icon}</Text>
            <Text className="font-display text-sm font-bold">{system.label}</Text>
            <Text className="mt-1 text-sm leading-tight opacity-60">{system.description}</Text>
          </Button>
        );
      })}
    </ScrollView>
  );
};

export default SystemSelector;
