import { IInvestigation } from "@med-simulate/types";

export const TESTS: IInvestigation.Investigation[] = [
  {
    id: "t1",
    name: "Pulse Oximetry",
    result: {
      type: "number",
      value: 98,
      reference: "95-100%",
      description: "Oxygen Saturation",
    },
  },
  {
    id: "t2",
    name: "Electrocardiogram (ECG)",
    result: {
      type: "text",
      value: "Normal sinus rhythm",
      description: "No acute ischemic changes noted",
    },
  },
  {
    id: "t3",
    name: "COVID-19 RT-PCR",
    guidance:
      "Important for ruling out viral infection in respiratory presentations. Given the patient's fever and respiratory symptoms, this test could help identify viral etiology.",
    result: {
      type: "binary",
      value: "negative",
      description: "No SARS-CoV-2 detected",
    },
  },
  {
    id: "t4",
    name: "COVID-19 Viral Genomic Sequencing",
    guidance: "Only necessary if RT-PCR is positive. Used for variant identification and tracking.",
    result: {
      type: "text",
      value: "Not performed - RT-PCR negative",
      description: "Indicated only if initial screening positive",
    },
  },
  {
    id: "t5",
    name: "Influenza Test",
    result: {
      type: "binary",
      value: "negative",
      description: "No influenza A or B detected",
    },
  },
  {
    id: "t6",
    name: "Biochemistry Panel",
    guidance:
      "Essential for assessing electrolytes, renal function, and liver function. Given the patient's age and presentation, this provides critical baseline data.",
    result: {
      type: "table",
      description: "Within normal limits",
      tableData: [
        { name: "Sodium", value: 138, unit: "mEq/L", reference: "135-145" },
        { name: "Potassium", value: 4.2, unit: "mEq/L", reference: "3.5-5.0" },
        { name: "Chloride", value: 102, unit: "mEq/L", reference: "98-107" },
        { name: "CO2", value: 24, unit: "mEq/L", reference: "23-29" },
        { name: "BUN", value: 18, unit: "mg/dL", reference: "7-20" },
        { name: "Creatinine", value: 0.9, unit: "mg/dL", reference: "0.7-1.3" },
        { name: "Glucose", value: 95, unit: "mg/dL", reference: "70-100" },
        { name: "Calcium", value: 9.5, unit: "mg/dL", reference: "8.5-10.2" },
        { name: "Albumin", value: 3.8, unit: "g/dL", reference: "3.5-5.0" },
        { name: "ALT", value: 28, unit: "U/L", reference: "7-56" },
        { name: "AST", value: 32, unit: "U/L", reference: "10-40" },
        { name: "Bilirubin", value: 0.8, unit: "mg/dL", reference: "0.1-1.2" },
      ],
    },
  },
  {
    id: "t7",
    name: "Blood Cultures",
    guidance:
      "Critical if bacterial infection is suspected. Should be drawn before antibiotics are initiated.",
    result: {
      type: "text",
      value: "No growth at 48 hours",
      description: "Pending final culture results",
    },
  },
  {
    id: "t8",
    name: "D-Dimer Test",
    guidance:
      "Helpful for ruling out thromboembolism. High sensitivity but lower specificity. Particularly relevant given immobility risk factors.",
    result: {
      type: "number",
      value: 0.3,
      reference: "<0.5 mcg/mL",
      description: "Normal - low probability of VTE",
    },
  },
  {
    id: "t9",
    name: "ESR/CRP",
    guidance:
      "Non-specific inflammatory markers useful for assessing degree of inflammation and monitoring response to treatment.",
    result: {
      type: "table",
      description: "Mild systemic inflammation",
      tableData: [
        { name: "ESR", value: 12, unit: "mm/hr", reference: "<20" },
        { name: "CRP", value: 2.1, unit: "mg/L", reference: "<3" },
      ],
    },
  },
  {
    id: "t10",
    name: "Full Blood Count with Differential",
    guidance:
      "Essential baseline test. Helps identify infection severity, anemia, and other hematologic abnormalities.",
    result: {
      type: "table",
      description: "Mild leukocytosis, otherwise normal",
      tableData: [
        { name: "WBC", value: 11.2, unit: "K/uL", reference: "4.5-11.0" },
        { name: "Hemoglobin", value: 13.8, unit: "g/dL", reference: "13.5-17.5" },
        { name: "Hematocrit", value: 41, unit: "%", reference: "41-53" },
        { name: "RBC", value: 4.8, unit: "M/uL", reference: "4.5-5.9" },
        { name: "Platelets", value: 245, unit: "K/uL", reference: "150-400" },
        { name: "Neutrophils", value: 75, unit: "%", reference: "50-70" },
        { name: "Lymphocytes", value: 18, unit: "%", reference: "20-40" },
        { name: "Monocytes", value: 5, unit: "%", reference: "2-8" },
      ],
    },
  },
  {
    id: "t11",
    name: "Serum Ferritin",
    result: {
      type: "number",
      value: 120,
      reference: "30-400 ng/mL",
      description: "Within normal limits",
    },
  },
  {
    id: "t12",
    name: "Serum LDH Test",
    guidance:
      "Useful for assessing tissue damage and certain infections. Elevated LDH can suggest myocardial infarction, hemolysis, or severe infections.",
    result: {
      type: "number",
      value: 195,
      reference: "140-280 U/L",
      description: "Normal",
    },
  },
  {
    id: "t13",
    name: "Chest X-Ray",
    guidance:
      "Essential imaging for respiratory symptoms. Will help rule out pneumonia, pneumothorax, or cardiac enlargement.",
    result: {
      type: "image",
      imageUrl: "https://images.unsplash.com/photo-1576091160550-112173f7f869?w=400&h=400&fit=crop",
      description: "Clear bilateral lung fields, no consolidation, normal cardiac silhouette",
    },
  },
  {
    id: "t14",
    name: "Chest CT Scan",
    guidance:
      "Consider if X-ray is inconclusive or high suspicion for PE/serious pathology. More sensitive than X-ray but involves radiation exposure.",
    result: {
      type: "image",
      imageUrl: "https://images.unsplash.com/photo-1631217314831-dc977b51072e?w=400&h=400&fit=crop",
      description: "High-resolution CT chest: No acute pulmonary embolism, no focal consolidation",
    },
  },

  {
    id: "t1-d",
    name: "Pulse Oximetry",
    result: {
      type: "number",
      value: 98,
      reference: "95-100%",
      description: "Oxygen Saturation",
    },
  },
  {
    id: "t2-d",
    name: "Electrocardiogram (ECG)",
    result: {
      type: "text",
      value: "Normal sinus rhythm",
      description: "No acute ischemic changes noted",
    },
  },
  {
    id: "t3-d",
    name: "COVID-19 RT-PCR",
    guidance:
      "Important for ruling out viral infection in respiratory presentations. Given the patient's fever and respiratory symptoms, this test could help identify viral etiology.",
    result: {
      type: "binary",
      value: "negative",
      description: "No SARS-CoV-2 detected",
    },
  },
  {
    id: "t4-d",
    name: "COVID-19 Viral Genomic Sequencing",
    guidance: "Only necessary if RT-PCR is positive. Used for variant identification and tracking.",
    result: {
      type: "text",
      value: "Not performed - RT-PCR negative",
      description: "Indicated only if initial screening positive",
    },
  },
  {
    id: "t5-d",
    name: "Influenza Test",
    result: {
      type: "binary",
      value: "negative",
      description: "No influenza A or B detected",
    },
  },
  {
    id: "t6-d",
    name: "Biochemistry Panel",
    guidance:
      "Essential for assessing electrolytes, renal function, and liver function. Given the patient's age and presentation, this provides critical baseline data.",
    result: {
      type: "table",
      description: "Within normal limits",
      tableData: [
        { name: "Sodium", value: 138, unit: "mEq/L", reference: "135-145" },
        { name: "Potassium", value: 4.2, unit: "mEq/L", reference: "3.5-5.0" },
        { name: "Chloride", value: 102, unit: "mEq/L", reference: "98-107" },
        { name: "CO2", value: 24, unit: "mEq/L", reference: "23-29" },
        { name: "BUN", value: 18, unit: "mg/dL", reference: "7-20" },
        { name: "Creatinine", value: 0.9, unit: "mg/dL", reference: "0.7-1.3" },
        { name: "Glucose", value: 95, unit: "mg/dL", reference: "70-100" },
        { name: "Calcium", value: 9.5, unit: "mg/dL", reference: "8.5-10.2" },
        { name: "Albumin", value: 3.8, unit: "g/dL", reference: "3.5-5.0" },
        { name: "ALT", value: 28, unit: "U/L", reference: "7-56" },
        { name: "AST", value: 32, unit: "U/L", reference: "10-40" },
        { name: "Bilirubin", value: 0.8, unit: "mg/dL", reference: "0.1-1.2" },
      ],
    },
  },
  {
    id: "t7-d",
    name: "Blood Cultures",
    guidance:
      "Critical if bacterial infection is suspected. Should be drawn before antibiotics are initiated.",
    result: {
      type: "text",
      value: "No growth at 48 hours",
      description: "Pending final culture results",
    },
  },
  {
    id: "t8-d",
    name: "D-Dimer Test",
    guidance:
      "Helpful for ruling out thromboembolism. High sensitivity but lower specificity. Particularly relevant given immobility risk factors.",
    result: {
      type: "number",
      value: 0.3,
      reference: "<0.5 mcg/mL",
      description: "Normal - low probability of VTE",
    },
  },
  {
    id: "t9-d",
    name: "ESR/CRP",
    guidance:
      "Non-specific inflammatory markers useful for assessing degree of inflammation and monitoring response to treatment.",
    result: {
      type: "table",
      description: "Mild systemic inflammation",
      tableData: [
        { name: "ESR", value: 12, unit: "mm/hr", reference: "<20" },
        { name: "CRP", value: 2.1, unit: "mg/L", reference: "<3" },
      ],
    },
  },
  {
    id: "t10-d",
    name: "Full Blood Count with Differential",
    guidance:
      "Essential baseline test. Helps identify infection severity, anemia, and other hematologic abnormalities.",
    result: {
      type: "table",
      description: "Mild leukocytosis, otherwise normal",
      tableData: [
        { name: "WBC", value: 11.2, unit: "K/uL", reference: "4.5-11.0" },
        { name: "Hemoglobin", value: 13.8, unit: "g/dL", reference: "13.5-17.5" },
        { name: "Hematocrit", value: 41, unit: "%", reference: "41-53" },
        { name: "RBC", value: 4.8, unit: "M/uL", reference: "4.5-5.9" },
        { name: "Platelets", value: 245, unit: "K/uL", reference: "150-400" },
        { name: "Neutrophils", value: 75, unit: "%", reference: "50-70" },
        { name: "Lymphocytes", value: 18, unit: "%", reference: "20-40" },
        { name: "Monocytes", value: 5, unit: "%", reference: "2-8" },
      ],
    },
  },
  {
    id: "t11-d",
    name: "Serum Ferritin",
    result: {
      type: "number",
      value: 120,
      reference: "30-400 ng/mL",
      description: "Within normal limits",
    },
  },
  {
    id: "t12-d",
    name: "Serum LDH Test",
    guidance:
      "Useful for assessing tissue damage and certain infections. Elevated LDH can suggest myocardial infarction, hemolysis, or severe infections.",
    result: {
      type: "number",
      value: 195,
      reference: "140-280 U/L",
      description: "Normal",
    },
  },
  {
    id: "t13-d",
    name: "Chest X-Ray",
    guidance:
      "Essential imaging for respiratory symptoms. Will help rule out pneumonia, pneumothorax, or cardiac enlargement.",
    result: {
      type: "image",
      imageUrl: "https://images.unsplash.com/photo-1576091160550-112173f7f869?w=400&h=400&fit=crop",
      description: "Clear bilateral lung fields, no consolidation, normal cardiac silhouette",
    },
  },
  {
    id: "t14-d",
    name: "Chest CT Scan",
    guidance:
      "Consider if X-ray is inconclusive or high suspicion for PE/serious pathology. More sensitive than X-ray but involves radiation exposure.",
    result: {
      type: "image",
      imageUrl: "https://images.unsplash.com/photo-1631217314831-dc977b51072e?w=400&h=400&fit=crop",
      description: "High-resolution CT chest: No acute pulmonary embolism, no focal consolidation",
    },
  },
];

// export const TREATMENTS = [
//   {
//     id: "tr1",
//     name: "IV Cannula (18G)",
//     result: {
//       type: "text",
//       value: "Cannula inserted successfully",
//       description: "18G Green cannula in right ACF",
//     },
//   },
//   {
//     id: "tr2",
//     name: "IV Normal Saline (500ml)",
//     result: {
//       type: "text",
//       value: "Saline bolus started",
//       description: "Infusing over 20 minutes",
//     },
//   },
//   {
//     id: "tr3",
//     name: "Oxygen Mask (6L/min)",
//     result: { type: "text", value: "Oxygen therapy initiated", description: "Hudson mask at 6L" },
//   },
//   {
//     id: "tr4",
//     name: "Aspirin (300mg PO)",
//     result: { type: "text", value: "Medication administered", description: "Chewed orally" },
//   },
//   {
//     id: "tr5",
//     name: "Nitroglycerin (SL)",
//     result: { type: "text", value: "Medication administered", description: "Sublingual spray" },
//   },
//   {
//     id: "tr6",
//     name: "Morphine (2mg IV)",
//     result: { type: "text", value: "Medication administered", description: "Slow IV push" },
//   },
// ];

// export const CONSULTATIONS = [
//   {
//     id: "c1",
//     name: "Cardiology Consult",
//     result: {
//       type: "text",
//       value: "Urgent Review Completed",
//       description: "Recommend urgent ECHO and Troponin monitoring. Possible NSTEMI.",
//     },
//   },
//   {
//     id: "c2",
//     name: "General Surgery Consult",
//     result: {
//       type: "text",
//       value: "Review Completed",
//       description: "No acute surgical abdomen at this time. Monitor inflammatory markers.",
//     },
//   },
//   {
//     id: "c3",
//     name: "Respiratory Medicine Consult",
//     result: {
//       type: "text",
//       value: "Review Completed",
//       description: "Likely exacerbation of COPD. Continue bronchodilators and steroids.",
//     },
//   },
//   {
//     id: "c4",
//     name: "Senior Resident Review",
//     result: {
//       type: "text",
//       value: "Review Completed",
//       description: "Patient is stable but requires close monitoring for the next 4 hours.",
//     },
//   },
// ];
