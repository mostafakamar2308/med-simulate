import routes from "@/routes";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import express, { json } from "express";

const app = express();
const port = "5001";

app.use(cors({ credentials: true, origin: true }));
app.use(json());
app.use(clerkMiddleware());

app.use("/api/v1/cases", routes.cases);
app.use("/api/v1/chat", routes.chat);

app.listen(port, () => {
  console.log(`Med Simulate Api listening on port ${port}`);
});
