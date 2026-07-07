import fs from "node:fs";
import { randomUUID } from "node:crypto";
import multer from "multer";
import { env } from "../config/env";
import { ApiError } from "../utils/apiError";

fs.mkdirSync(env.uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, env.uploadDir),
  filename: (_req, file, cb) => {
    const extension = file.originalname.split(".").pop()?.toLowerCase() ?? "jpg";
    cb(null, `${randomUUID()}.${extension}`);
  }
});

export const uploadFoodImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.mimetype)) {
      return cb(new ApiError(422, "Food image must be a jpg, jpeg, or png"));
    }
    cb(null, true);
  }
});
