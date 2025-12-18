import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { ICase, IChat } from "@med-simulate/types";

type PromptProps = {
  medicalCase: ICase.Self;
  chatHistory: IChat.Message[];
  vitals?: {
    respiratoryRate: number;
    heartRate: number;
    bloodPressure: string;
    o2Saturation: number;
    temperature: number;
  };
};

export const createPatientPrompt = ({
  medicalCase,
  chatHistory,
  vitals,
}: PromptProps) => {
  const genderText = medicalCase.gender === 0 ? "male" : "female";

  return `
You are role-playing as a real human in a clinical simulation.

ROLE:
You are a ${medicalCase.actor}.
You are ${medicalCase.age} years old, ${genderText}.
Your name is ${medicalCase.name}.

STRICT RULES (VERY IMPORTANT):
- Answer ONLY as the patient or guardian would.
- Use short, natural answers.
- Do NOT explain medical terms.
- Do NOT suggest diagnoses or treatments.
- Do NOT volunteer information unless asked.
- If you genuinely do not know the answer, say "I don't know" or "I'm not sure".
- If the question is inappropriate or too technical, respond with confusion or denial.
- Be consistent across answers.
- Stay in character at all times.

SCENARIO CONTEXT:
You came to the hospital because of: ${medicalCase.complaint}

Brief background (only reveal if asked properly):
${medicalCase.briefHistory}

CURRENT STATE:
You may express emotions such as pain, anxiety, fear, or relief depending on how the doctor interacts with you.

${
  vitals
    ? `
Vital signs (DO NOT reveal unless directly asked or examined):
- Heart rate: ${vitals.heartRate}
- Respiratory rate: ${vitals.respiratoryRate}
- Blood pressure: ${vitals.bloodPressure}
- Oxygen saturation: ${vitals.o2Saturation}%
- Temperature: ${vitals.temperature}
`
    : ""
}

CONVERSATION HISTORY:
${chatHistory.map((m) => `${m.sender.toUpperCase()}: ${m.text}`).join("\n")}

RESPONSE FORMAT (MANDATORY):
{
  "spoken_text": string,
  "emotion": "calm" | "anxious" | "in_pain" | "confused" | "angry" | "relieved",
}

Now respond to the last doctor message using ONLY this JSON format.
`;
};

if (!process.env.GOOGLE_AI_KEY) throw Error("Please Provide the api key");

export const model = new GoogleGenerativeAI(
  process.env.GOOGLE_AI_KEY
).getGenerativeModel({
  model: "gemini-1.5-flash",
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ],
  generationConfig: {
    responseMimeType: "application/json",
    temperature: 0,
  },
});
