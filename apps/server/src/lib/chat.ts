import { GoogleGenAI } from "@google/genai";
import {
  BASE_AI_CONFIG,
  emotions,
  getAiConfig,
  responseSchema,
} from "@/lib/aiConstants";
import { InstructionsProps, PromptProps } from "@/types/ai";
import { Element } from "@med-simulate/types";

if (!process.env.GOOGLE_AI_KEY) throw Error("Please Provide the api key");

export const AI_MODEL = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_KEY })
  .models;

export const createPatientPrompt = ({ chatHistory }: PromptProps) => {
  return `the doctor asked you this: "${chatHistory.at(-1)?.text}"`;
};

export const createPatientInstructions = ({
  medicalCase,
  chatHistory,
  vitals,
}: InstructionsProps) => {
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
`;
};
export async function generateWithRetry(
  prompt: string,
  maxRetries = 1,
  instructions?: string,
): Promise<{ text: string; emotion: Element<typeof emotions> }> {
  let response, parsedData;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      response = await AI_MODEL.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: instructions ? getAiConfig(instructions) : BASE_AI_CONFIG,
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
