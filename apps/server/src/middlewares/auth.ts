import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //   const userId = req.headers["x-user-id"] as string;
  //   if (!userId) {
  //     return res.status(401).json({ error: "Unauthorized" });
  //   }
  (req as any).user = { id: uuid() };
  next();
};
