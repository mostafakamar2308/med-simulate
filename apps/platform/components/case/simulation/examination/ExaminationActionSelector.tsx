import { ScrollView, Text, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
  BodySystem,
  ExaminationTechnique,
  ExaminationTechniqueType,
  Finding,
  SpecialExaminationTechnique,
} from "@med-simulate/types";
import { EXAMINATION_TECHNIQUES, SPECIAL_SIGNS } from "@/constants/examinations";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FindingViewer from "@/components/case/simulation/examination/FindingViewer";

type ExaminationSelectorProps = {
  selectedTechnique: ExaminationTechniqueType;
  selectedSystem: BodySystem;
};

const ExaminationActionSelector: React.FC<ExaminationSelectorProps> = ({
  selectedSystem,
  selectedTechnique,
}) => {
  const [selectedRegularTechniqueAreaFindings, setSelectedRegularTechniqueAreaFindings] = useState<
    Finding[] | null
  >(null);
  const [selectedSpecialTechnique, setSelectedSpecialTechnique] =
    useState<SpecialExaminationTechnique | null>(null);

  useEffect(() => {
    setSelectedRegularTechniqueAreaFindings(null);
    setSelectedSpecialTechnique(null);
  }, [selectedSystem, selectedTechnique]);

  const techniques: ExaminationTechnique[] = useMemo(() => {
    if (selectedTechnique === "special") return SPECIAL_SIGNS;

    return EXAMINATION_TECHNIQUES.filter(
      (item) => item.type === selectedTechnique && item.system === selectedSystem
    );
  }, [selectedTechnique, selectedSystem]);

  if (techniques.length === 0)
    return (
      <View>
        <Text>No Techinques here Yet</Text>
      </View>
    );

  if (selectedTechnique === "special")
    return (
      <View className="w-full px-2">
        <Text className="text-xl font-bold text-muted-foreground">Available Actions</Text>

        <ScrollView contentContainerClassName="grid w-full grid-cols-2 gap-2">
          {techniques.map((item, idx) => (
            <Button
              onPress={() => {
                setSelectedSpecialTechnique(item.type === "special" ? item : null);
                setSelectedRegularTechniqueAreaFindings(null);
              }}
              variant={"outline"}
              key={idx}>
              <Text>{item.type === "special" && item.label}</Text>
            </Button>
          ))}
        </ScrollView>
        {selectedSpecialTechnique ? (
          <Text
            className={cn(
              "my-2 w-full rounded-lg border px-2 py-4 text-center text-2xl font-bold",
              selectedSpecialTechnique?.value === "positive"
                ? "border-primary bg-green-600/80 text-white"
                : "border-destructive bg-destructive/80 text-white"
            )}>
            <Text className="font-normal">{selectedSpecialTechnique?.label}:</Text>{" "}
            {selectedSpecialTechnique?.value}
          </Text>
        ) : null}
      </View>
    );

  return (
    <View className="w-full space-y-2 px-2">
      <Text className="text-xl font-bold text-muted-foreground">Available Areas</Text>

      <ScrollView contentContainerClassName="grid grid-cols-2 gap-2" className="my-2 w-full px-2">
        {techniques.map((item) => {
          return (
            item.type !== "special" &&
            item.areas.map((area) => (
              <Button
                onPress={() => {
                  setSelectedRegularTechniqueAreaFindings(area.findings);
                  setSelectedSpecialTechnique(null);
                }}
                variant={"default"}
                key={area.id}>
                <Text>{area.label}</Text>
              </Button>
            ))
          );
        })}
      </ScrollView>
      {selectedRegularTechniqueAreaFindings ? (
        <FindingViewer findings={selectedRegularTechniqueAreaFindings} />
      ) : null}
    </View>
  );
};

export default ExaminationActionSelector;
