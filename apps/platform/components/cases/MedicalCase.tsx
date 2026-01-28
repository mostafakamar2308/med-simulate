import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { categoryMap, difficultyMap, genderMap, specialityMap } from "@/lib/constants";
import { ICase } from "@med-simulate/types";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Pressable, View } from "react-native";
import { Button } from "@/components/ui/button";

const MedicalCase: React.FC<{ medicalCase: ICase.FullCase }> = ({ medicalCase }) => {
  const router = useRouter();
  const goToCase = useCallback(
    () =>
      router.push({
        pathname: "/case/[id]",
        params: { id: medicalCase.id },
      }),
    [medicalCase.id, router]
  );

  return (
    <Pressable onPress={goToCase} className="my-2">
      <Card className="group cursor-pointer !gap-2 border-border/50 bg-white p-4 shadow-lg transition-shadow">
        <View className="flex flex-row gap-2">
          <Badge variant="secondary" className="bg-blue-100 font-normal text-blue-700">
            <Text>{specialityMap[medicalCase.speciality]}</Text>
          </Badge>
          <Badge variant="outline" className="border-border font-normal text-muted-foreground">
            <Text>{difficultyMap[medicalCase.difficulty]}</Text>
          </Badge>
        </View>

        <Text className="group-text-primary mb-1 text-lg font-bold text-foreground transition-colors">
          {medicalCase.title}
        </Text>
        <Text className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {medicalCase.complaint}
        </Text>

        <View className="flex flex-row items-center justify-between border-t border-border/50 pt-3 text-xs text-muted-foreground">
          <Text>
            {medicalCase.name}, {medicalCase.age}y {genderMap[medicalCase.gender]}
          </Text>
          <Text className="rounded-sm bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
            {categoryMap[medicalCase.category]}
          </Text>
        </View>
        <Button onPress={goToCase}>
          <Text>Start Case</Text>
        </Button>
      </Card>
    </Pressable>
  );
};

export default MedicalCase;
