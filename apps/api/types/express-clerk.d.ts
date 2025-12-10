import { StrictAuthProp } from "@clerk/express";

declare module "express-serve-static-core" {
  type Request = StrictAuthProp & Request;
}
