import type { ErrorRequestHandler } from "express";
import { ApiError } from "../utils/apiError";

export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  void next;
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      message: error.message,
      details: error.details
    });
  }

  console.error(error);
  return res.status(500).json({ message: "Internal server error" });
};
