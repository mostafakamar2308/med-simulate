import { db } from "@/lib/prisma";
import { IUser } from "@med-simulate/types";

class Users {
  constructor() {}

  async create(payload: IUser.CreateNewUserPayload) {
    return await db.user.create({
      data: {
        ...payload,
        whatsapp_number: payload.whatsappNumber,
      },
    });
  }
}

export const users = new Users();
