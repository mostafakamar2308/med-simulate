import dayjs from "@/lib/dayjs";
import { db } from "@/lib/prisma";
import { ICase } from "@med-simulate/types";
import { AREAS_BY_SYSTEM_AND_TECHNIQUE, BODY_SYSTEMS } from "./lib/constants";
import type { Prisma } from "generated/prisma/client";

class Cases {
  constructor() {}

  async find(
    payload: ICase.FindCasesApiQuery,
  ): Promise<ICase.FindCasesResponse> {
    const pagination = {
      size: payload.size || 10,
      page: payload.page || 0,
    };

    // TODO: implement case filtering
    const cases = await db.case.findMany({
      take: pagination.size,
      skip: pagination.size * pagination.page,
    });

    return {
      list: cases,
      size: cases.length,
      page: pagination.page,
    };
  }

  async findCaseById(id: string): Promise<ICase.FullCase | null> {
    const medicalCase = await db.case.findUnique({
      where: {
        id,
      },
      include: {
        bodySystems: {
          include: {
            examinationTechniques: {
              include: {
                examinationAreas: {
                  include: {
                    examinationFindings: {},
                  },
                },
              },
            },
          },
        },
        investigations: {
          include: {
            investigationResult: {
              include: { tableData: {} },
            },
          },
        },
      },
    });

    if (!medicalCase) return null;

    return medicalCase;
  }

  async createCase(data: {
    title: string;
    complaint: string;
    difficulty: number;
    category: number;
    speciality: number;
    name: string;
    age: number;
    gender: number;
    weight: number;
    height: number;
    briefHistory: string;
    objective: string;
    actor: string;
    diagnosis: string;
  }) {
    return await db.$transaction(async (tx) => {
      const newCase = await tx.case.create({ data });

      for (const sys of BODY_SYSTEMS) {
        const bodySystem = await tx.bodySystem.create({
          data: {
            label: sys.label as any,
            icon: sys.icon,
            caseId: newCase.id,
          },
        });

        for (const techLabel of sys.techniques) {
          const technique = await tx.examinationTechnique.create({
            data: {
              label: techLabel as any,
              icon: this.getIconForTechnique(techLabel),
              bodySystemId: bodySystem.id,
            },
          });

          // Get areas for this system and technique
          const areas = AREAS_BY_SYSTEM_AND_TECHNIQUE[sys.label]?.[
            techLabel
          ] || ["General area"];
          for (const areaLabel of areas) {
            await tx.examinationArea.create({
              data: {
                label: areaLabel,
                examinationTechniqueId: technique.id,
              },
            });
          }
        }
      }

      return newCase;
    });
  }

  // Helper to get icon for technique (optional)
  private getIconForTechnique(tech: string): string {
    const icons: Record<string, string> = {
      Inspect: "👁️",
      Palpate: "✋",
      Auscultate: "🩺",
      Percuss: "👆",
    };
    return icons[tech] || "🔍";
  }

  // Update case basic info
  async updateCase(
    id: string,
    data: Partial<Omit<ICase.Case, "id" | "createdAt" | "updatedAt">>,
  ) {
    return db.case.update({ where: { id }, data });
  }

  // Delete case (cascade handled by Prisma if relations have onDelete: Cascade)
  async deleteCase(id: string) {
    return db.case.delete({ where: { id } });
  }

  async updateFinding(
    findingId: string,
    data: {
      type?: "img" | "audio" | "video" | "text";
      normal?: boolean;
      description?: string;
      mediaFileId?: string | null;
    },
  ) {
    const updateData: Prisma.ExaminationFindingUpdateInput = {};
    if (data.type !== undefined) updateData.type = data.type;
    if (data.normal !== undefined) updateData.normal = data.normal;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.mediaFileId !== undefined) {
      if (data.mediaFileId === null) {
        updateData.mediaFile = { disconnect: true };
      } else {
        updateData.mediaFile = { connect: { id: data.mediaFileId } };
      }
    }

    return db.examinationFinding.update({
      where: { id: findingId },
      data: updateData,
    });
  }
  // Get or create finding for an area (if not exists)
  async getOrCreateFinding(areaId: string) {
    let finding = await db.examinationFinding.findFirst({
      where: { examinationAreaId: areaId },
    });
    if (!finding) {
      finding = await db.examinationFinding.create({
        data: {
          type: "text",
          description: "",
          examinationAreaId: areaId,
        },
      });
    }
    return finding;
  }

  async addInvestigation(
    caseId: string,
    data: {
      label: string;
      guidance?: string;
      result?: { reference?: string; value?: string; description?: string };
    },
  ) {
    return db.$transaction(async (tx) => {
      const investigationData: Prisma.InvestigationCreateInput = {
        label: data.label,
        case: { connect: { id: caseId } },
        investigationResult: {
          create: {
            description: data.result?.description ?? "",
            // Only include reference/value if they are defined (not null)
            ...(data.result?.reference !== undefined && {
              reference: data.result.reference,
            }),
            ...(data.result?.value !== undefined && {
              value: data.result.value,
            }),
          },
        },
      };
      if (data.guidance !== undefined)
        investigationData.guidance = data.guidance;

      const investigation = await tx.investigation.create({
        data: investigationData,
        include: { investigationResult: true },
      });
      return investigation;
    });
  }

  // Update investigation result (including media link)
  async updateInvestigationResult(
    resultId: string,
    data: {
      reference?: string;
      value?: string;
      description?: string;
      mediaFileId?: string | null;
    },
  ) {
    return db.investigationResult.update({ where: { id: resultId }, data });
  }

  // Add table data to investigation result
  async addTableData(
    resultId: string,
    rows: { name: string; value: number; unit: string; reference: string }[],
  ) {
    return db.investigationTableData.createMany({
      data: rows.map((row) => ({ ...row, investigationResultId: resultId })),
    });
  }
}

export const cases = new Cases();
