import { getUser } from "@/lib/auth";
import { unauthenticated } from "@/lib/error";
import { cases } from "@med-simulate/models";
import { ICase } from "@med-simulate/types";
import { NextFunction, Request, Response } from "express";
import z from "zod";

const findCasesApiQuery = z.object({
  search: z.string().optional(),
  filters: z
    .object({
      speciality: z.array(z.nativeEnum(ICase.CaseSpeciality)).optional(),
      difficulty: z.array(z.nativeEnum(ICase.CaseDifficulty)).optional(),
      category: z.array(z.nativeEnum(ICase.CaseCategory)).optional(),
    })
    .optional(),
  page: z.number().optional(),
  size: z.number().optional(),
});

export async function findCases(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // const user = await getUser(req);
  // if (!user) return next(unauthenticated());

  const query = findCasesApiQuery.parse(req.query);
  const result: ICase.FindCasesResponse = await cases.find(query);

  res.status(200).json(result);
}

const findCaseByIdQuery = z.object({
  id: z.string(),
});

export async function findCaseById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // const user = await getUser(req);
  // if (!user) return next(unauthenticated());

  const { id } = findCaseByIdQuery.parse(req.params);
  const result = await cases.findCaseById(id);
  console.log("here");

  res.status(200).json(result);
}
