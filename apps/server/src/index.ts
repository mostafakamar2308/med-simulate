import routes from "@/routes";
import cors from "cors";
import express, { json } from "express";
import { errorHandler } from "@/middlewares/error";
import { ASSETS_DIR } from "./config/uploadConfig";
import helmet from "helmet";

const app = express();

const port = "5001";

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://192.168.1.9:5173",
      "http://192.168.1.9:5174",
      "https://dashboard.academiyati.com",
      "https://ped-simulate.academiyati.com",
      "http://192.168.1.9:5001",
    ],
  }),
);
app.use(json());
app.use(helmet());
app.use(
  "/assets",
  express.static(ASSETS_DIR, {
    maxAge: "30d",
    immutable: true,
    index: false,
    setHeaders: (res, filePath) => {
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");

      if (filePath.endsWith(".gif")) res.setHeader("Content-Type", "image/gif");
    },
  }),
);
app.use("/api/v1/cases", routes.cases);
app.use("/api/v1/chat", routes.chat);
app.use("/api/v1/chat-v2", routes.chatV2);
app.use("/api/v1/media", routes.media);
app.use("/api/v1/grading", routes.grading);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Med Simulate Api listening on port ${port}`);
});
