import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  categoryMap,
  difficultyMap,
  genderMap,
  specialityMap,
} from "@/lib/constants";
import { ICase } from "@med-simulate/types";
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const MedicalCase: React.FC<{ medicalCase: ICase.Self }> = ({
  medicalCase,
}) => {
  const navigate = useNavigate();
  const goToCase = useCallback(
    () =>
      navigate({
        pathname: `/case/${medicalCase.id}`,
      }),
    [medicalCase.id, navigate]
  );

  return (
    <button onClick={goToCase} className="my-2 grow h-full">
      <Card className="group flex flex-col justify-between cursor-pointer h-full gap-2 border-border/50 bg-white p-4 shadow-lg transition-shadow">
        <div className="flex flex-row gap-2">
          <Badge
            variant="secondary"
            className="bg-blue-100 font-normal text-blue-700"
          >
            <p>{specialityMap[medicalCase.speciality]}</p>
          </Badge>
          <Badge
            variant="outline"
            className="border-border font-normal text-muted-foreground"
          >
            <p>{difficultyMap[medicalCase.difficulty]}</p>
          </Badge>
        </div>
        <div className="grow">
          <p className="group-text-primary mb-1 text-lg font-bold text-foreground transition-colors">
            {medicalCase.title}
          </p>
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {medicalCase.complaint}
          </p>

          <div className="flex flex-row items-center justify-between border-t border-border/50 pt-3 text-xs text-muted-foreground">
            <p>
              {medicalCase.name}, {medicalCase.age}y{" "}
              {genderMap[medicalCase.gender]}
            </p>
            <p className="rounded-sm bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
              {categoryMap[medicalCase.category]}
            </p>
          </div>
        </div>
        <Button className="cursor-pointer" onClick={goToCase}>
          <p>Start Case</p>
        </Button>
      </Card>
    </button>
  );
};

export default MedicalCase;
