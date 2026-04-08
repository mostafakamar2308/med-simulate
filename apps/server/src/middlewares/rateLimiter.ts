import rateLimit from "express-rate-limit";

export const uploadLimiter = rateLimit({
  windowMs: 20 * 60 * 1000,
  max: 50,
  message: {
    success: false,
    error: "Too many uploads from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
