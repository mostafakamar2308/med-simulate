import { RegularExaminationTechnique, SpecialExaminationTechnique } from "@med-simulate/types";

export const EXAMINATION_TECHNIQUES: RegularExaminationTechnique[] = [
  // GENERAL – INSPECT
  {
    type: "inspect",
    system: "general",
    areas: [
      {
        id: "general-appearance",
        label: "General appearance",
        findings: [
          {
            type: "text",
            description: "Patient appears tired and mildly distressed",
          },
          {
            type: "img",
            url: "https://prod-images-static.radiopaedia.org/images/70418365/dr-original.jpg",
            description: "Patient lying still on bed",
          },
        ],
      },
      {
        id: "skin-color",
        label: "Skin color",
        findings: [
          {
            type: "text",
            description: "Skin looks pale",
          },
        ],
      },
    ],
  },

  // CARDIOVASCULAR – INSPECT
  {
    type: "inspect",
    system: "cardiovascular",
    areas: [
      {
        id: "precordium",
        label: "Precordium",
        findings: [
          {
            type: "text",
            description: "Visible pulsations over the precordium",
          },
        ],
      },
      {
        id: "neck-veins",
        label: "Neck veins",
        findings: [
          {
            type: "img",
            url: "https://prod-images-static.radiopaedia.org/images/70418365/dr-original.jpg",
            description: "Jugular venous distension noted",
          },
        ],
      },
    ],
  },

  // CARDIOVASCULAR – PALPATE
  {
    type: "palpate",
    system: "cardiovascular",
    areas: [
      {
        id: "apex-beat",
        label: "Apex beat",
        findings: [
          {
            type: "text",
            description: "Apex beat felt at the 6th intercostal space",
          },
        ],
      },
      {
        id: "peripheral-pulses",
        label: "Peripheral pulses",
        findings: [
          {
            type: "text",
            description: "Pulse feels weak and thready",
          },
        ],
      },
    ],
  },

  // CARDIOVASCULAR – AUSCULTATE
  {
    type: "auscultate",
    system: "cardiovascular",
    areas: [
      {
        id: "mitral-area",
        label: "Mitral area",
        findings: [
          {
            type: "audio",
            url: "https://prod-images-static.radiopaedia.org/images/70418365/dr-original.jpg",
            description: "Abnormal systolic murmur heard",
          },
        ],
      },
      {
        id: "aortic-area",
        label: "Aortic area",
        findings: [
          {
            type: "audio",
            url: "https://prod-images-static.radiopaedia.org/images/70418365/dr-original.jpg",
            description: "Normal heart sounds",
          },
        ],
      },
    ],
  },

  // RESPIRATORY – AUSCULTATE
  {
    type: "auscultate",
    system: "respiratory",
    areas: [
      {
        id: "right-lower-lobe",
        label: "Right lower lung",
        findings: [
          {
            type: "audio",
            url: "https://prod-images-static.radiopaedia.org/images/70418365/dr-original.jpg",
            description: "Fine crackles heard",
          },
        ],
      },
    ],
  },
];

export const SPECIAL_SIGNS: SpecialExaminationTechnique[] = [
  {
    type: "special",
    label: "Murphy sign",
    value: "positive",
  },
  {
    type: "special",
    label: "Murphy sign",
    value: "negative",
  },
  {
    type: "special",
    label: "Babinski sign",
    value: "positive",
  },
  {
    type: "special",
    label: "Babinski sign",
    value: "negative",
  },
  {
    type: "special",
    label: "Kernig sign",
    value: "negative",
  },
];
