import { ICase } from "@med-simulate/types";
import { db } from "./lib/prisma";

class Cases {
  constructor() {}

  async find(payload: ICase.FindCasesApiQuery) {
    return await db.case.findMany({
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
      take: payload.size || 10,
      skip: (payload.size || 10) * (payload.page || 1),
    });
  }
}

export const cases = new Cases();
