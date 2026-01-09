import { Pressable, ScrollView, Text, View } from "react-native";
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
  onFinding: (finding: Finding) => void;
};

const ExaminationActionSelector: React.FC<ExaminationSelectorProps> = ({
  selectedSystem,
  selectedTechnique,
  onFinding,
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

        <ScrollView contentContainerClassName="flex flex-col gap-2">
          {techniques.map((item, idx) => (
            <Button
              onPress={() => {
                setSelectedSpecialTechnique(item.type === "special" ? item : null);
                setSelectedRegularTechniqueAreaFindings(null);
              }}
              className="w-3/4 border-primary"
              variant={"outline"}
              key={idx}>
              <Text>{item.type === "special" && item.label}</Text>
            </Button>
          ))}
        </ScrollView>
        {selectedSpecialTechnique ? (
          <Text
            className={cn(
              "my-2 w-screen max-w-xs rounded-lg border px-2 py-4 text-center text-2xl font-bold",
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

      <ScrollView className="my-2 flex w-full gap-4 px-2">
        <View className="flex flex-row flex-wrap gap-2">
          {techniques.map((item) => {
            return (
              item.type !== "special" &&
              item.areas.map((area) => (
                <Pressable
                  onPress={() => {
                    setSelectedRegularTechniqueAreaFindings(area.findings);
                    setSelectedSpecialTechnique(null);
                    area.findings.forEach((finding) => {
                      if (!finding.normal) onFinding(finding);
                    });
                  }}
                  className="rounded-xl bg-primary p-4"
                  key={area.id}>
                  <Text className="text-xl text-white">{area.label}</Text>
                </Pressable>
              ))
            );
          })}
        </View>
        <View className="mt-2">
          {selectedRegularTechniqueAreaFindings ? (
            <FindingViewer findings={selectedRegularTechniqueAreaFindings} />
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default ExaminationActionSelector;
