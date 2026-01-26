import { GoogleGenAI } from "@google/genai";
import { AI_CONFIG, emotions, responseSchema } from "@/lib/aiConstants";
import { PromptProps } from "@/types/ai";
import { Element } from "@med-simulate/types";

if (!process.env.GOOGLE_AI_KEY) throw Error("Please Provide the api key");

export const AI_MODEL = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_KEY })
  .models;

export const createPatientPrompt = ({
  medicalCase,
  chatHistory,
  vitals,
}: PromptProps) => {
  const genderText = medicalCase.gender === 0 ? "male" : "female";

  return `
CASE CONTEXT:
You are the mother of ${medicalCase.name}, a ${medicalCase.age}-year-old ${genderText}.
Role: ${medicalCase.actor}

You came to the hospital because of:
${medicalCase.complaint}

Background (only reveal if asked appropriately):
${medicalCase.briefHistory}

${
  vitals
    ? `
Vital signs (do not reveal unless examined or directly asked):
- HR: ${vitals.heartRate}
- RR: ${vitals.respiratoryRate}
- BP: ${vitals.bloodPressure}
- O2 Sat: ${vitals.o2Saturation}%
- Temp: ${vitals.temperature}
`
    : ""
}

CONVERSATION HISTORY:
${chatHistory.map((m) => `${m.sender.toUpperCase()}: ${m.text}`).join("\n")}

INSTRUCTION:
Respond to the last doctor message as the patient in Egyptian Arabic dialect (Ammiya). 
IMPORTANT: You MUST provide the response with full Arabic diacritics (Tashkeel) specifically on vowels to ensure correct pronunciation (e.g., use كُحّة instead of كحة). 
Do not use Modern Standard Arabic; stay in the Egyptian dialect.
تحدث بالعامية المصرية كشخص مريض.
يجب وضع التشكيل (الحركات) بدقة شديدة مع مراعاة نطق العامية:
- كلمة (كحة) تشكل هكذا: كُحَّة (بضمة على الكاف وليس فتحة).
- كلمة (مش) تشكل هكذا: مِش (بكسرة تحت الميم وليس فتحة).
- كلمة (أوي) تشكل هكذا: أَوِي.

هذا التشكيل حيوي جداً لأنني أستخدمه لمحرك نطق آلي.
`;
};

export async function generateWithRetry(
  prompt: string,
  maxRetries = 1,
): Promise<{ text: string; emotion: Element<typeof emotions> }> {
  let response, parsedData;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      response = await AI_MODEL.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: AI_CONFIG,
      });

      if (!response) throw new Error("No Response");

      parsedData = responseSchema.parse(JSON.parse(response.text!));
      return parsedData;
    } catch (error) {
      console.log(error);
      retries++;
    }
  }

  throw new Error("Failed to parse JSON after multiple retries.");
}
