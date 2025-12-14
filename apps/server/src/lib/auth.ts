import { clerkClient, getAuth, User } from "@clerk/express";
import { Request } from "express";

export async function getUser(req: Request): Promise<User | null> {
  const { userId } = getAuth(req);

  if (!userId) return null;

  const user = await clerkClient.users.getUser(userId);

  if (!user) return null;
  return user;
}
