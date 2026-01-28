import dayjs from "@/lib/dayjs";
import { db } from "@/lib/prisma";
import { ICase } from "@med-simulate/types";

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
      },
    });

    if (!medicalCase) return null;

    return medicalCase;
  }
}

export const cases = new Cases();
