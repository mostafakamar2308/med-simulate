import { db } from "@/lib/prisma";
import { IUser } from "@med-simulate/types";

class Users {
  constructor() {}

  async create(payload: IUser.CreateNewUserPayload) {
    return await db.user.create({
      data: {
        ...payload,
      },
    });
  }
}

export const users = new Users();
