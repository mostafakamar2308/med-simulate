import path from "path";
const __dirname = process.cwd();

export const ALLOWED_MIME_TYPES = {
  image: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  video: ["video/mp4", "video/webm", "video/quicktime"],
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
];

export const MAX_SIZES = {
  image: (Number(process.env.MAX_FILE_SIZE_MB_IMAGE) || 10) * 1024 * 1024,
  video: (Number(process.env.MAX_FILE_SIZE_MB_VIDEO) || 50) * 1024 * 1024,
};

export const ASSETS_DIR = path.resolve("./assets");
