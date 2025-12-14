import { PrismaClient } from "@/../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw Error("Please provide valid connection string");

const adapter = new PrismaPg({ connectionString });
export const db = new PrismaClient({ adapter });
