import { createPatientPrompt } from "@/lib/chat";
import { bad } from "@/lib/error";
import { cases } from "@med-simulate/models";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import { parseMimeType, pcmToWavBuffer } from "@/lib/audio";

if (!process.env.GOOGLE_AI_KEY) throw Error("Please Provide the api key");
const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_KEY });

const sendMessageQuery = z.object({
  caseId: z.string(),
  chat: z.array(
    z.object({
      sender: z.enum(["doctor", "patient"]),
      text: z.string(),
    }),
  ),
});

export async function sendMessageStream(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // const user = await getUser(req);
  // if (!user) return next(unauthenticated());

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const { caseId, chat } = sendMessageQuery.parse(req.body);
    const medicalCase = await cases.findCaseById(caseId);
    if (!medicalCase) return next(bad());

    const prompt = createPatientPrompt({ medicalCase, chatHistory: chat });

    const textResponse = await genAI.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: [prompt],
    });

    let fullText = "";
    for await (const chunk of textResponse) {
      fullText += chunk.text;
      const cleanText = chunk.text?.replace(/[\u064B-\u0652]/g, "");
      res.write(
        `data: ${JSON.stringify({ type: "text", content: cleanText })} \n\n\n`,
      );

      const sentences = fullText.split(/[\.\؟\!]/);
      fullText = sentences.pop() || "";

      for (const sentence of sentences) {
        const trimmed = sentence.trim();
        if (!trimmed) continue;

        const ttsResponse = await genAI.models.generateContentStream({
          model: "gemini-2.5-pro-preview-tts",
          contents: [{ role: "user", parts: [{ text: trimmed }] }],
          config: {
            temperature: 1,
            responseModalities: ["audio"],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: "Zephyr" },
              },
            },
          },
        });

        for await (const ttsChunk of ttsResponse) {
          const inlineData =
            ttsChunk.candidates?.[0]?.content?.parts?.[0]?.inlineData;
          if (inlineData) {
            const mimeOptions = parseMimeType(inlineData.mimeType || "");

            const wavBuffer = pcmToWavBuffer(
              inlineData.data || "",
              mimeOptions,
            );
            res.write(
              `data: ${JSON.stringify({
                type: "audio",
                content: wavBuffer.toString("base64"),
              })} \n\n\n`,
            );
          }
        }
      }
    }

    res.write(`data: ${JSON.stringify({ type: "done" })}\n\n\n`);
    res.end();
  } catch (error: any) {
    console.error("AI/TTS Error:", error);
    res.write(JSON.stringify({ type: "error", message: error.message }));
    res.end();
  }
}
