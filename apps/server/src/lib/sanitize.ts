import { v4 as uuidv4 } from "uuid";
import path from "path";

export function generateSafeFilename(originalName: string): string {
  const ext = path.extname(originalName).toLowerCase();
  // Remove any path traversal or double extensions
  const cleanExt = ext.replace(/[^a-z0-9.]/gi, "");
  return `${uuidv4()}${cleanExt}`;
}
