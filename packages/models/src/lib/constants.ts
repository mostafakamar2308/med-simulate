export const BODY_SYSTEMS = [
  { label: "General", icon: "👤", techniques: ["Inspect"] },
  {
    label: "Cardiovascular",
    icon: "❤️",
    techniques: ["Inspect", "Palpate", "Auscultate"],
  },
  {
    label: "Respiratory",
    icon: "🫁",
    techniques: ["Inspect", "Palpate", "Auscultate", "Percuss"],
  },
  {
    label: "Abdomen",
    icon: "🍽️",
    techniques: ["Inspect", "Palpate", "Auscultate", "Percuss"],
  },
  { label: "Neurological", icon: "🧠", techniques: ["Inspect"] },
  { label: "Extremities", icon: "🦵", techniques: ["Inspect", "Palpate"] },
];

// Areas per technique (customize as needed)
export const AREAS_BY_SYSTEM_AND_TECHNIQUE: Record<
  string,
  Record<string, string[]>
> = {
  General: {
    Inspect: ["Face", "Neck", "Hands", "Feet"],
  },
  Cardiovascular: {
    Inspect: ["Precordium"],
    Palpate: ["Apex beat", "Parasternal area"],
    Auscultate: [
      "Mitral valve (MV)",
      "Tricuspid valve (TV)",
      "Aortic valve (AV)",
      "Pulmonic valve (PV)",
      "Apex",
    ],
  },
  Respiratory: {
    Inspect: ["Shape of chest", "Chest movement", "Discoloration", "Scars"],
    Palpate: ["Tenderness", "Warmness", "Tactile fremitus"],
    Auscultate: [
      "Upper lobes",
      "Middle lobes",
      "Lower lobes",
      "Right middle lobe",
      "Lingula",
    ],
    Percuss: ["Anterior chest", "Posterior chest", "Lateral chest"],
  },
  // Add for Abdomen, Neurological, Extremities as needed
  Abdomen: {
    Inspect: ["Shape", "Skin changes", "Pulsations"],
    Palpate: [
      "Light palpation",
      "Deep palpation",
      "Liver",
      "Spleen",
      "Kidneys",
    ],
    Auscultate: ["Bowel sounds", "Bruits"],
    Percuss: ["Liver span", "Spleen size", "Shifting dullness"],
  },
  Neurological: {
    Inspect: [
      "Level of consciousness",
      "Pupils",
      "Motor function",
      "Sensory function",
    ],
  },
  Extremities: {
    Inspect: ["Clubbing", "Cyanosis", "Edema", "Muscle wasting"],
    Palpate: ["Pulses", "Temperature", "Capillary refill"],
  },
};
