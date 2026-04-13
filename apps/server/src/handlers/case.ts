import { getUser } from "@/lib/auth";
import { getFullPhysicalExam } from "@/lib/case";
import { notFound, unauthenticated } from "@/lib/error";
import { cases, media } from "@med-simulate/models";
import { ICase } from "@med-simulate/types";
import { NextFunction, Request, Response } from "express";
import z from "zod";

const findCasesApiQuery = z.object({
  search: z.string().optional(),
  filters: z
    .object({
      speciality: z.array(z.nativeEnum(ICase.Speciality)).optional(),
      difficulty: z.array(z.nativeEnum(ICase.Difficulty)).optional(),
      category: z.array(z.nativeEnum(ICase.Category)).optional(),
    })
    .optional(),
  page: z.coerce.number().optional(),
  size: z.coerce.number().optional(),
});

export const idQuery = z.object({ id: z.string() });

export async function findCases(req: Request, res: Response) {
  // const user = await getUser(req);
  // if (!user) return next(unauthenticated());

  const result: ICase.FindCasesResponse = await cases.find();

  return res.status(200).json(result);
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
  const medicalCase = await cases.findCaseById(id);
  if (!medicalCase) return next(notFound());

  const fullPhysicalExam = getFullPhysicalExam(medicalCase);

  const result: ICase.FullCase = {
    ...medicalCase,
    bodySystems: fullPhysicalExam,
  };

  return res.status(200).json(result);
}

export async function linkToFinding(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { mediaId, findingId } = req.params;
    if (typeof mediaId !== "string" || typeof findingId !== "string")
      throw new Error("invalid id");
    const result = await media.linkToFinding(mediaId, findingId);
    return res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function linkToInvestigationResult(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { mediaId, resultId } = req.params;
    if (typeof mediaId !== "string" || typeof resultId !== "string")
      throw new Error("invalid id");
    const result = await media.linkToInvestigationResult(mediaId, resultId);
    return res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function createCase(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const caseData = req.body;
    const newCase = await cases.createCase(caseData);
    res.status(201).json({ success: true, data: newCase });
  } catch (err) {
    next(err);
  }
}

export async function listCases(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await cases.find();
    return res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
}

export async function getCase(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = idQuery.parse(req.params);

    const fullCase = await cases.findCaseById(id);
    if (!fullCase)
      return res.status(404).json({ success: false, error: "Case not found" });

    return res.json({ success: true, data: fullCase });
  } catch (err) {
    next(err);
  }
}

export async function updateCase(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = idQuery.parse(req.params);
    const updated = await cases.updateCase(id, req.body);
    return res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

export async function deleteCase(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = idQuery.parse(req.params);
    await cases.deleteCase(id);
    return res.json({ success: true, message: "Case deleted" });
  } catch (err) {
    next(err);
  }
}

// Finding update
export async function updateFinding(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = idQuery.parse(req.params);
    const { type, normal, description, mediaFileId } = req.body;
    const updated = await cases.updateFinding(id, {
      type,
      normal,
      description,
      mediaFileId,
    });
    return res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

// Get or create finding for an area
export async function getFindingForArea(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = idQuery.parse(req.params);
    const finding = await cases.getOrCreateFinding(id);
    return res.json({ success: true, data: finding });
  } catch (err) {
    next(err);
  }
}

// Investigation routes
export async function addInvestigation(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = idQuery.parse(req.params);

    const investigation = await cases.addInvestigation(id, req.body);
    res.status(201).json({ success: true, data: investigation });
  } catch (err) {
    next(err);
  }
}

export async function updateInvestigationResult(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = idQuery.parse(req.params);
    const updated = await cases.updateInvestigationResult(id, req.body);
    return res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

export async function addTableData(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = idQuery.parse(req.params);
    const { rows } = req.body;
    await cases.addTableData(id, rows);
    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
