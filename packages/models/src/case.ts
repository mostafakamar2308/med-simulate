import dayjs from "@/lib/dayjs";
import { db } from "@/lib/prisma";
import { ICase } from "@med-simulate/types";

class Cases {
  constructor() {}

  async find(
    payload: ICase.FindCasesApiQuery
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
      list: cases.map(this.from),
      size: cases.length,
      page: pagination.page,
    };
  }

  async findCaseById(id: string): Promise<ICase.Self | null> {
    const medicalCase = await db.case.findUnique({
      where: {
        id,
      },
    });

    if (!medicalCase) return null;

    return this.from(medicalCase);
  }

  from(caseItem: ICase.Row): ICase.Self {
    return {
      ...caseItem,
      briefHistory: caseItem.brief_history,
      createdAt: dayjs.utc(caseItem.created_at).toISOString(),
      updatedAt: dayjs.utc(caseItem.updated_at).toISOString(),
    };
  }
}

export const cases = new Cases();
