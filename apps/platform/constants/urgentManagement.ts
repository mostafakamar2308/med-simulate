import { IConsultation, IInvestigation, ITreatment } from "@med-simulate/types";

export const TESTS: IInvestigation.Investigation[] = [
  {
    id: "t1",
    role: "investigation",
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
    role: "investigation",
    name: "Electrocardiogram (ECG)",
    result: {
      type: "text",
      value: "Normal sinus rhythm",
      description: "No acute ischemic changes noted",
    },
  },
  {
    id: "t3",
    role: "investigation",
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
    role: "investigation",
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
    role: "investigation",
    name: "Influenza Test",
    result: {
      type: "binary",
      value: "negative",
      description: "No influenza A or B detected",
    },
  },
  {
    id: "t6",
    role: "investigation",
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
    role: "investigation",
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
    role: "investigation",
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
    role: "investigation",
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
    role: "investigation",
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
    role: "investigation",
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
    role: "investigation",
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
    role: "investigation",
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
    role: "investigation",
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
    role: "investigation",
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
    role: "investigation",
    name: "Electrocardiogram (ECG)",
    result: {
      type: "text",
      value: "Normal sinus rhythm",
      description: "No acute ischemic changes noted",
    },
  },
  {
    id: "t3-d",
    role: "investigation",
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
    role: "investigation",
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
    role: "investigation",
    name: "Influenza Test",
    result: {
      type: "binary",
      value: "negative",
      description: "No influenza A or B detected",
    },
  },
  {
    id: "t6-d",
    role: "investigation",
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
    role: "investigation",
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
    role: "investigation",
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
    role: "investigation",
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
    role: "investigation",
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
    role: "investigation",
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
    role: "investigation",
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
    role: "investigation",
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
    role: "investigation",
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

export const TREATMENTS: ITreatment.Treatment[] = [
  {
    id: "tr1",
    role: "treatment",
    name: "IV Cannula (18G)",
    result: {
      type: "text",
      value: "Cannula inserted successfully",
      description: "18G Green cannula in right ACF",
    },
  },
  {
    id: "tr2",
    role: "treatment",
    name: "IV Normal Saline (500ml)",
    result: {
      type: "text",
      value: "Saline bolus started",
      description: "Infusing over 20 minutes",
    },
  },
  {
    id: "tr3",
    role: "treatment",
    name: "Oxygen Mask (6L/min)",
    result: { type: "text", value: "Oxygen therapy initiated", description: "Hudson mask at 6L" },
  },
  {
    id: "tr4",
    role: "treatment",
    name: "Aspirin (300mg PO)",
    result: { type: "text", value: "Medication administered", description: "Chewed orally" },
  },
  {
    id: "tr5",
    role: "treatment",
    name: "Nitroglycerin (SL)",
    result: { type: "text", value: "Medication administered", description: "Sublingual spray" },
  },
  {
    id: "tr6",
    role: "treatment",
    name: "Morphine (2mg IV)",
    result: { type: "text", value: "Medication administered", description: "Slow IV push" },
  },
];

export const CONSULTATIONS: IConsultation.Consultation[] = [
  {
    id: "c1",
    role: "consultation",
    name: "Cardiology Consult",
    result: {
      type: "text",
      value: "Urgent Review Completed",
      description: "Recommend urgent ECHO and Troponin monitoring. Possible NSTEMI.",
    },
  },
  {
    id: "c2",
    role: "consultation",
    name: "General Surgery Consult",
    result: {
      type: "text",
      value: "Review Completed",
      description: "No acute surgical abdomen at this time. Monitor inflammatory markers.",
    },
  },
  {
    id: "c3",
    role: "consultation",
    name: "Respiratory Medicine Consult",
    result: {
      type: "text",
      value: "Review Completed",
      description: "Likely exacerbation of COPD. Continue bronchodilators and steroids.",
    },
  },
  {
    id: "c4",
    role: "consultation",
    name: "Senior Resident Review",
    result: {
      type: "text",
      value: "Review Completed",
      description: "Patient is stable but requires close monitoring for the next 4 hours.",
    },
  },
];
