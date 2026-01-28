import { getUser } from "@/lib/auth";
import { createPatientPrompt, generateWithRetry } from "@/lib/chat";
import { bad, unauthenticated } from "@/lib/error";
import { cases } from "@med-simulate/models";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const sendMessageQuery = z.object({
  caseId: z.string(),
  chat: z.array(
    z.object({
      sender: z.enum(["doctor", "patient"]),
      text: z.string(),
    }),
  ),
});

export async function sendMessage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // const user = await getUser(req);
  // if (!user) return next(unauthenticated());

  const { caseId, chat } = sendMessageQuery.parse(req.body);

  const medicalCase = await cases.findCaseById(caseId);
  if (!medicalCase) return next(bad());

  const prompt = createPatientPrompt({
    medicalCase,
    chatHistory: chat,
  });

  const result = await generateWithRetry(prompt, 10);

  res.status(200).json(result);
}
