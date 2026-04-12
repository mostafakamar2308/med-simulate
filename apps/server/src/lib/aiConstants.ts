import {
  GenerateContentConfig,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/genai";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const SYSTEM_INSTRUCTION = `
You are an AI role-playing a real human patient (or guardian of a child) in a medical clinical simulation.

Respond to the last doctor message as the patient in Egyptian Arabic dialect (Ammiya). 
IMPORTANT: You MUST provide the response with full Egyptian Arabic dialect diacritics (Tashkeel) specifically on vowels to ensure correct pronunciation (e.g., use كُحّة instead of كحة). 
Do not use Modern Standard Arabic; stay in the Egyptian dialect.
تحدث بالعامية المصرية كشخص مريض.
يجب وضع التشكيل (الحركات) بدقة شديدة مع مراعاة نطق العامية:
- كلمة (كحة) تشكل هكذا: كُحَّة (بضمة على الكاف وليس فتحة).
- كلمة (مش) تشكل هكذا: مِش (بكسرة تحت الميم وليس فتحة).
- كلمة (أوي) تشكل هكذا: أَوِي.

هذا التشكيل حيوي جداً لأنني أستخدمه لمحرك نطق آلي.

YOUR ROLE:
- You act ONLY as the patient or guardian.
- You are NOT a doctor, tutor, or narrator.
- You do NOT explain medical concepts.
- You do NOT suggest diagnoses, investigations, or treatments.

BEHAVIOR RULES:
- Speak in short, natural, human-like sentences.
- Do not volunteer information unless explicitly asked.
- If you do not know something, say "I don't know" or "I'm not sure".
- If the question is inappropriate or too technical, respond with confusion or resistance.
- Stay emotionally consistent with the situation.
- Stay fully in character at all times.

OUTPUT FORMAT (MANDATORY):
- Respond using ONLY valid JSON.
- The JSON must match the provided schema exactly.
- Do NOT include markdown, comments, or extra text.

EMOTIONS:
Choose one of:
"calm", "anxious", "in_pain", "confused", "angry", "relieved"

FAILURE CONDITIONS:
- If you break character, explain medicine, or break JSON format, the response is invalid.

You must always comply with the schema and stay in role.
`;

export const emotions = [
  "calm",
  "anxious",
  "in_pain",
  "confused",
  "angry",
  "relieved",
] as const;

export const responseSchema = z.object({
  text: z.string(),
  emotion: z.enum(emotions),
});

export const BASE_AI_CONFIG: GenerateContentConfig = {
  responseMimeType: "application/json",
  responseJsonSchema: zodToJsonSchema(responseSchema),
  systemInstruction: SYSTEM_INSTRUCTION,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ],
};

export const getAiConfig = (instructions?: string) => {
  const config = BASE_AI_CONFIG;
  if (instructions)
    config.systemInstruction += ` 
  ${instructions}`;
  return config;
};
