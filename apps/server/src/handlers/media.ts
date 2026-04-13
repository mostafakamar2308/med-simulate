import { MAX_SIZES } from "@/config/uploadConfig";
import { validateFileSignature } from "@/lib/fileSignature";
import { media } from "@med-simulate/models";
import { NextFunction, Request, Response } from "express";
import fs from "fs-extra";
import path from "path";

export async function uploadFile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ success: false, error: "No file uploaded." });
      return;
    }

    const category = (req as any).fileCategory as "audio" | "image" | "video";
    const maxSizeForCategory = MAX_SIZES[category];

    if (file.size > maxSizeForCategory) {
      await fs.remove(file.path);
      const maxMB = maxSizeForCategory / (1024 * 1024);
      res.status(413).json({
        success: false,
        error: `File too large. Maximum size for ${category}s is ${maxMB} MB.`,
      });
      return;
    }

    const isValid = await validateFileSignature(file.path, category);
    if (!isValid) {
      await fs.remove(file.path);
      res.status(400).json({
        success: false,
        error: "File content does not match its declared type.",
      });
      return;
    }

    const { displayName } = req.body;

    const mediaFile = await media.create({
      diskName: file.filename,
      displayName: displayName || file.originalname,
      mimeType: file.mimetype,
      size: file.size,
    });

    const publicUrl = `/assets/${file.filename}`;
    res.status(200).json({
      success: true,
      id: mediaFile.id,
      url: publicUrl,
      displayName: mediaFile.displayName,
      mediaType: file.mimetype,
      size: file.size,
    });
  } catch (err) {
    if (req.file) await fs.remove(req.file.path).catch(() => {});
    next(err);
  }
}

export async function listFiles(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { search, type, page, limit } = req.query;
    // type can be "image" or "video" – we'll map to mimeType prefix
    let mimeTypePrefix: string | undefined;
    if (type === "image") mimeTypePrefix = "image/";
    if (type === "video") mimeTypePrefix = "video/";
    if (type === "audio") mimeTypePrefix = "audio/";

    const result = await media.findMany({
      search: search as string,
      mimeTypePrefix,
      page: page ? parseInt(page as string) : 1,
      limit: limit ? parseInt(limit as string) : 20,
    });

    const itemsWithUrl = result.items.map((item) => ({
      ...item,
      url: `/assets/${item.diskName}`,
    }));

    res.json({
      success: true,
      files: itemsWithUrl,
      total: result.total,
      page: result.page,
      limit: result.limit,
    });
  } catch (err) {
    next(err);
  }
}

export async function getFile(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (typeof id !== "string") throw new Error("invalid id");
    const mediaFile = await media.findById(id);
    if (!mediaFile) {
      return res.status(404).json({ success: false, error: "File not found" });
    }
    res.json({
      success: true,
      file: {
        ...mediaFile,
        url: `/assets/${mediaFile.diskName}`,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function updateFile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    if (typeof id !== "string") throw new Error("invalid id");
    const { displayName } = req.body;
    const updated = await media.update(id, { displayName });
    res.json({
      success: true,
      file: {
        ...updated,
        url: `/assets/${updated.diskName}`,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteFile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    if (typeof id !== "string") throw new Error("invalid id");
    const mediaFile = await media.findById(id);
    if (!mediaFile) {
      return res.status(404).json({ success: false, error: "File not found" });
    }
    await media.delete(id);
    const filePath = path.join(
      process.env.ASSETS_PATH || "./assets",
      mediaFile.diskName,
    );
    await fs
      .remove(filePath)
      .catch((err) => console.error("Failed to delete file from disk:", err));
    res.json({ success: true, message: "File deleted" });
  } catch (err) {
    next(err);
  }
}
