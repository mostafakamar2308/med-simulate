import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import { ALLOWED_MIME_TYPES, ALLOWED_EXTENSIONS } from "@/config/uploadConfig";
import path from "path";
import { generateSafeFilename } from "@/lib/sanitize";
import { MAX_FILE_SIZE_GLOBAL } from "@/constants/file";

type FileCategory = "image" | "video" | "audio";

function getFileCategory(mimeType: string): FileCategory | null {
  if (ALLOWED_MIME_TYPES.image.includes(mimeType as any)) return "image";
  if (ALLOWED_MIME_TYPES.video.includes(mimeType as any)) return "video";
  if (ALLOWED_MIME_TYPES.audio.includes(mimeType as any)) return "audio";
  return null;
}

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  const category = getFileCategory(file.mimetype);
  if (!category) {
    return cb(
      new Error(
        "Invalid file type. Only images, audios ,videos, and GIFs are allowed.",
      ),
    );
  }
  const ext = path.extname(file.originalname).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return cb(new Error("File extension not allowed."));
  }
  (req as any).fileCategory = category;
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, process.env.ASSETS_PATH || "./assets");
  },
  filename: (_req, file, cb) => {
    cb(null, generateSafeFilename(file.originalname));
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE_GLOBAL,
  },
  fileFilter,
});
