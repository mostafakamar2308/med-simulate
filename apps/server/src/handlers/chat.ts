import { getUser } from "@/lib/auth";
import { createPatientPrompt, model } from "@/lib/chat";
import { bad, unauthenticated } from "@/lib/error";
import { cases } from "@med-simulate/models";
import { NextFunction, Request, Response } from "express";
import z from "zod";

const sendMessageQuery = z.object({
  caseId: z.uuid(),
  chat: z.array(
    z.object({
      sender: z.enum(["doctor", "patient"]),
      text: z.string(),
    })
  ),
});

export async function sendMessage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await getUser(req);
  if (!user) return next(unauthenticated());

  const { caseId, chat } = sendMessageQuery.parse(req.params);

  const medicalCase = await cases.findCaseById(caseId);
  if (!medicalCase) return next(bad());

  const prompt = createPatientPrompt({
    medicalCase,
    chatHistory: chat,
  });

  const result = await generateWithRetry(prompt);

  res.status(200).json(result);
}

async function generateWithRetry(
  prompt: string,
  maxRetries = 5
): Promise<{ message: string }> {
  let response, text, parsedData;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      response = await model.generateContent(prompt);

      text = response.response.text();
      parsedData = JSON.parse(text);
      return parsedData;
    } catch (error) {
      console.log(error);
      retries++;
    }
  }

  throw new Error("Failed to parse JSON after multiple retries.");
}
