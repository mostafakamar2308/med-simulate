import fs from "fs/promises";

const signatures: Record<string, string> = {
  ffd8ffe0: "image/jpeg",
  ffd8ffe1: "image/jpeg",
  "89504e47": "image/png",
  "47494638": "image/gif",
  "52494646": "image/webp",
  "000001ba": "video/mp4",
  "000001b3": "video/mp4",
  "1a45dfa3": "video/webm",
  "6d6f6f76": "video/quicktime",
};

export async function validateFileSignature(
  filePath: string,
  expectedMimeCategory: "image" | "video",
): Promise<boolean> {
  const buffer = Buffer.alloc(4);
  const fd = await fs.open(filePath, "r");
  await fd.read(buffer, 0, 4, 0);
  await fd.close();
  const hex = buffer.toString("hex").slice(0, 8);
  const detectedType = signatures[hex];
  if (!detectedType) return false;
  const category = detectedType.startsWith("image/") ? "image" : "video";
  return category === expectedMimeCategory;
}
