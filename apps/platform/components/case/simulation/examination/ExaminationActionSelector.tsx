import { ScrollView, Text, View } from "react-native";
import React, { useMemo } from "react";
import { BodySystem, ExaminationTechnique, ExaminationTechniqueType } from "@med-simulate/types";
import { EXAMINATION_TECHNIQUES, SPECIAL_SIGNS } from "@/constants/examinations";

type ExaminationSelectorProps = {
  selectedTechnique: ExaminationTechniqueType;
  selectedSystem: BodySystem;
};

const ExaminationActionSelector: React.FC<ExaminationSelectorProps> = ({
  selectedSystem,
  selectedTechnique,
}) => {
  const techniques: ExaminationTechnique[] = useMemo(() => {
    if (selectedTechnique === "special") return SPECIAL_SIGNS;

    return EXAMINATION_TECHNIQUES.filter(
      (item) =>
        item.type !== "special" && item.type === selectedTechnique && item.system === selectedSystem
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
      <ScrollView>
        {techniques.map((item, idx) => (
          <Text key={idx}>{item.type === "special" && item.label}</Text>
        ))}
      </ScrollView>
    );

  return (
    <ScrollView>
      {techniques.map((item, idx) => (
        <Text key={idx}>
          {item.type !== "special" &&
            item.areas.map((area) => <Text key={area.id}>{area.label}</Text>)}
        </Text>
      ))}
    </ScrollView>
  );
};

export default ExaminationActionSelector;
