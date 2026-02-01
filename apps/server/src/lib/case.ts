import { NORMAL_EXAM_TEMPLATE } from "@/constants/case";
import { ICase } from "@med-simulate/types";
import { v4 as uuidv4 } from "uuid"; // or use crypto.randomUUID()

export function getFullPhysicalExam(
  medicalCase: ICase.FullCase,
): ICase.BodySystem[] {
  return NORMAL_EXAM_TEMPLATE.map((templateSystem) => {
    // Check if the user has provided abnormal findings for this system
    const dbSystem = medicalCase.bodySystems.find(
      (s) => s.label === templateSystem.label,
    );

    const systemId = dbSystem?.id || uuidv4();

    const examinationTechniques = templateSystem.examinationTechniques.map(
      (tTech) => {
        const dbTech = dbSystem?.examinationTechniques.find(
          (t) => t.label === tTech.label,
        );
        const techId = dbTech?.id || uuidv4();

        const examinationAreas = tTech.examinationAreas.map((tArea) => {
          const dbArea = dbTech?.examinationAreas.find(
            (a) => a.label === tArea.label,
          );

          if (dbArea) return dbArea;

          const areaId = uuidv4();
          return {
            id: areaId,
            label: tArea.label,
            examinationTechniqueId: techId,
            examinationFindings: tArea.examinationFindings.map((f) => ({
              ...f,
              id: uuidv4(),
              examinationAreaId: areaId,
            })),
          } as ICase.ExaminationArea;
        });

        return {
          id: techId,
          label: tTech.label,
          icon: tTech.icon,
          bodySystemId: systemId,
          examinationAreas,
        } as ICase.ExaminationTechnique;
      },
    );

    return {
      id: systemId,
      label: templateSystem.label,
      icon: templateSystem.icon,
      caseId: medicalCase.id,
      examinationTechniques,
    } as ICase.BodySystem;
  });
}
