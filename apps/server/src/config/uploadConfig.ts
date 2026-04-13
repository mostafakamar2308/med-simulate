import path from "path";

export const ALLOWED_MIME_TYPES = {
  image: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  video: ["video/mp4", "video/webm", "video/quicktime"],
  audio: ["audio/mpeg", "audio/mp3", "audio/aac", "audio/ogg", "audio/wav"],
};
export const ALLOWED_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".mp4",
  ".webm",
  ".mov",
  ".mp3",
  ".mpeg",
  ".wav",
  ".ogg",
];

export const MAX_SIZES = {
  image: (Number(process.env.MAX_FILE_SIZE_MB_IMAGE) || 10) * 1024 * 1024,
  audio: (Number(process.env.MAX_FILE_SIZE_MB_AUDIO) || 30) * 1024 * 1024,
  video: (Number(process.env.MAX_FILE_SIZE_MB_VIDEO) || 50) * 1024 * 1024,
};

export const ASSETS_DIR = path.resolve("./assets");
