import type { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/apiError";

export const validate: RequestHandler = (req, _res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(new ApiError(422, "Validation failed", result.array()));
  }
  next();
};
