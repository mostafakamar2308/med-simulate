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
      page: payload.page || 1,
    };

    const cases = await db.case.findMany({
      where: {
        category: payload.filters?.category
          ? {
              in: payload.filters?.category,
            }
          : {},
        speciality: payload.filters?.speciality
          ? {
              in: payload.filters?.speciality,
            }
          : {},
        difficulty: payload.filters?.difficulty
          ? {
              in: payload.filters?.difficulty,
            }
          : {},
        title: payload.search
          ? {
              contains: payload.search,
            }
          : {},
      },
      take: pagination.size,
      skip: pagination.size * pagination.page,
    });

    return {
      list: cases.map(this.from),
      size: cases.length,
      page: pagination.page,
    };
  }

  from(caseItem: ICase.Row): ICase.Self {
    return {
      ...caseItem,
      createdAt: dayjs.utc(caseItem.created_at).toISOString(),
      updatedAt: dayjs.utc(caseItem.updated_at).toISOString(),
    };
  }
}

export const cases = new Cases();
