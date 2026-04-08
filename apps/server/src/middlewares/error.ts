import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err.stack);
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(413).json({ success: false, error: "File too large." });
    return;
  }
  if (err.message && err.message.includes("Invalid file type")) {
    res.status(400).json({ success: false, error: err.message });
    return;
  }
  res.status(500).json({ success: false, error: "Internal server error." });
}
