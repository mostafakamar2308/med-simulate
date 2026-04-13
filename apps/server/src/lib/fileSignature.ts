// import fs from "fs/promises";

// const signatures: Record<string, string> = {
//   ffd8ffe0: "image/jpeg",
//   ffd8ffe1: "image/jpeg",
//   "89504e47": "image/png",
//   "47494638": "image/gif",
//   "52494646": "image/webp",
//   "000001ba": "video/mp4",
//   "000001b3": "video/mp4",
//   "00000020": "video/mp4",
//   "1a45dfa3": "video/webm",
//   "6d6f6f76": "video/quicktime",
// };

// export async function validateFileSignature(
//   filePath: string,
//   expectedMimeCategory: "audio" | "image" | "video",
// ): Promise<boolean> {
//   const buffer = Buffer.alloc(4);
//   const fd = await fs.open(filePath, "r");
//   await fd.read(buffer, 0, 4, 0);
//   await fd.close();
//   const hex = buffer.toString("hex").slice(0, 8);
//   const detectedType = signatures[hex];
//   if (!detectedType) return false;
//   const category = detectedType.startsWith("image/")
//     ? "image"
//     : detectedType.startsWith("audio")
//       ? "audio"
//       : "video";
//   return category === expectedMimeCategory;
// }

import fs from "fs/promises";

type Signature = {
  magic: Buffer;
  mime: string;
  category: "image" | "video" | "audio";
};

const SIGNATURES: Signature[] = [
  // Images
  {
    magic: Buffer.from([0xff, 0xd8, 0xff, 0xe0]),
    mime: "image/jpeg",
    category: "image",
  },
  {
    magic: Buffer.from([0xff, 0xd8, 0xff, 0xe1]),
    mime: "image/jpeg",
    category: "image",
  },
  {
    magic: Buffer.from([0x89, 0x50, 0x4e, 0x47]),
    mime: "image/png",
    category: "image",
  },
  {
    magic: Buffer.from([0x47, 0x49, 0x46, 0x38]),
    mime: "image/gif",
    category: "image",
  },
  {
    magic: Buffer.from([0x52, 0x49, 0x46, 0x46]),
    mime: "image/webp",
    category: "image",
  }, // WebP (RIFF)
  // Video
  {
    magic: Buffer.from([0x00, 0x00, 0x01, 0xba]),
    mime: "video/mp4",
    category: "video",
  },
  {
    magic: Buffer.from([0x00, 0x00, 0x01, 0xb3]),
    mime: "video/mp4",
    category: "video",
  },
  {
    magic: Buffer.from([0x1a, 0x45, 0xdf, 0xa3]),
    mime: "video/webm",
    category: "video",
  },
  {
    magic: Buffer.from([0x6d, 0x6f, 0x6f, 0x76]),
    mime: "video/quicktime",
    category: "video",
  },
  // Audio
  {
    magic: Buffer.from([0x49, 0x44, 0x33]),
    mime: "audio/mpeg",
    category: "audio",
  }, // ID3 tag
  {
    magic: Buffer.from([0x4f, 0x67, 0x67, 0x53]),
    mime: "audio/ogg",
    category: "audio",
  }, // OggS
];

/**
 * Detect audio format from the first few bytes
 * Handles MP3 (frame sync), AAC (ADTS), WAV (RIFF+WAVE)
 */
async function detectAudioCategory(filePath: string): Promise<"audio" | false> {
  const buffer = Buffer.alloc(12); // Read enough for all checks
  const fd = await fs.open(filePath, "r");
  const { bytesRead } = await fd.read(buffer, 0, 12, 0);
  await fd.close();
  if (bytesRead < 12) return false;

  // Check for MP3 frame sync (0xFFE in first 12 bits)
  if (buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0) {
    return "audio";
  }
  // Check for AAC ADTS sync (0xFFF in first 12 bits)
  if (buffer[0] === 0xff && (buffer[1] & 0xf0) === 0xf0) {
    return "audio";
  }
  // Check for WAV: RIFF (bytes 0-3) and "WAVE" (bytes 8-11)
  if (
    buffer.toString("hex", 0, 4) === "52494646" &&
    buffer.toString("hex", 8, 12) === "57415645"
  ) {
    return "audio";
  }
  return false;
}

export async function validateFileSignature(
  filePath: string,
  expectedCategory: "audio" | "image" | "video",
): Promise<boolean> {
  // First check known signatures (images, videos, some audio)
  const firstBytes = Buffer.alloc(4);
  const fd = await fs.open(filePath, "r");
  const { bytesRead: firstRead } = await fd.read(firstBytes, 0, 4, 0);
  await fd.close();
  if (firstRead < 4) return false;

  for (const sig of SIGNATURES) {
    if (firstBytes.subarray(0, sig.magic.length).equals(sig.magic)) {
      return sig.category === expectedCategory;
    }
  }

  // Special handling for WebP (RIFF but not WAVE) – already covered by signature
  // For audio that wasn't caught by signature (e.g., MP3 without ID3, AAC, WAV)
  if (expectedCategory === "audio") {
    const isAudio = await detectAudioCategory(filePath);
    return isAudio === "audio";
  }

  return false;
}
