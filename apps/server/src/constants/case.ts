import { ICase } from "@med-simulate/types";

type TemplateFinding = Omit<
  ICase.ExaminationFinding,
  "id" | "examinationAreaId"
>;
type TemplateArea = Omit<
  ICase.ExaminationArea,
  "id" | "examinationTechniqueId" | "examinationFindings"
> & {
  examinationFindings: TemplateFinding[];
};
type TemplateTechnique = Omit<
  ICase.ExaminationTechnique,
  "id" | "bodySystemId" | "examinationAreas"
> & {
  examinationAreas: TemplateArea[];
};
type TemplateBodySystem = Omit<
  ICase.BodySystem,
  "id" | "caseId" | "examinationTechniques"
> & {
  examinationTechniques: TemplateTechnique[];
};

export const NORMAL_EXAM_TEMPLATE: TemplateBodySystem[] = [
  {
    label: "General",
    icon: "👤",
    examinationTechniques: [
      {
        label: "Inspect",
        icon: "👁️",
        examinationAreas: [
          {
            label: "General Appearance",
            examinationFindings: [
              {
                type: "text",
                normal: true,
                description: "Well-appearing, in no acute distress.",
              },
            ],
          },
          {
            label: "Skin",
            examinationFindings: [
              {
                type: "text",
                normal: true,
                description: "No rashes, cyanosis, or jaundice.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "Cardiovascular",
    icon: "🫀",
    examinationTechniques: [
      {
        label: "Inspect",
        icon: "👁️",
        examinationAreas: [
          {
            label: "Precordium",
            examinationFindings: [
              {
                type: "text",
                normal: true,
                description: "No visible pulsations or scars.",
              },
            ],
          },
        ],
      },
      {
        label: "Palpate",
        icon: "✋",
        examinationAreas: [
          {
            label: "Apex Beat",
            examinationFindings: [
              {
                type: "text",
                normal: true,
                description:
                  "Located at 5th intercostal space, mid-clavicular line.",
              },
            ],
          },
          {
            label: "Heaves/Thrills",
            examinationFindings: [
              { type: "text", normal: true, description: "None palpated." },
            ],
          },
        ],
      },
      {
        label: "Auscultate",
        icon: "👂",
        examinationAreas: [
          {
            label: "Heart Sounds",
            examinationFindings: [
              {
                type: "audio",
                normal: true,
                description:
                  "S1 and S2 heard clearly. No murmurs, rubs, or gallops.",
                url: "",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "Respiratory",
    icon: "🫁",
    examinationTechniques: [
      {
        label: "Inspect",
        icon: "👁️",
        examinationAreas: [
          {
            label: "Chest Expansion",
            examinationFindings: [
              {
                type: "text",
                normal: true,
                description: "Symmetrical chest expansion.",
              },
            ],
          },
        ],
      },
      {
        label: "Percuss",
        icon: "🥁",
        examinationAreas: [
          {
            label: "Lung Fields",
            examinationFindings: [
              {
                type: "text",
                normal: true,
                description: "Resonant throughout.",
              },
            ],
          },
        ],
      },
      {
        label: "Auscultate",
        icon: "👂",
        examinationAreas: [
          {
            label: "Breath Sounds",
            examinationFindings: [
              {
                type: "audio",
                normal: true,
                description: "Vesicular breath sounds, no wheeze or crackles.",
                url: "",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "Abdomen",
    icon: "🤰",
    examinationTechniques: [
      {
        label: "Inspect",
        icon: "👁️",
        examinationAreas: [
          {
            label: "Surface",
            examinationFindings: [
              {
                type: "text",
                normal: true,
                description: "Flat, no scars or distention.",
              },
            ],
          },
        ],
      },
      {
        label: "Auscultate",
        icon: "👂",
        examinationAreas: [
          {
            label: "Bowel Sounds",
            examinationFindings: [
              {
                type: "audio",
                normal: true,
                description: "Normal active bowel sounds.",
                url: "",
              },
            ],
          },
        ],
      },
      {
        label: "Palpate",
        icon: "✋",
        examinationAreas: [
          {
            label: "Superficial",
            examinationFindings: [
              {
                type: "text",
                normal: true,
                description: "Soft, non-tender, no guarding.",
              },
            ],
          },
          {
            label: "Organomegaly",
            examinationFindings: [
              {
                type: "text",
                normal: true,
                description: "Liver and spleen not palpable.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "Neurological",
    icon: "🧠",
    examinationTechniques: [
      {
        label: "Inspect",
        icon: "👁️",
        examinationAreas: [
          {
            label: "Gait",
            examinationFindings: [
              {
                type: "text",
                normal: true,
                description: "Steady and coordinated.",
              },
            ],
          },
        ],
      },
      {
        label: "Palpate",
        icon: "✋",
        examinationAreas: [
          {
            label: "Muscle Tone",
            examinationFindings: [
              {
                type: "text",
                normal: true,
                description: "Normal tone in all four limbs.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "Extremities",
    icon: "💪",
    examinationTechniques: [
      {
        label: "Inspect",
        icon: "👁️",
        examinationAreas: [
          {
            label: "Edema",
            examinationFindings: [
              {
                type: "text",
                normal: true,
                description: "No peripheral edema.",
              },
            ],
          },
        ],
      },
      {
        label: "Palpate",
        icon: "✋",
        examinationAreas: [
          {
            label: "Pulses",
            examinationFindings: [
              {
                type: "text",
                normal: true,
                description: "Peripheral pulses present and equal.",
              },
            ],
          },
        ],
      },
    ],
  },
];
