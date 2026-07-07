import { Router } from "express";
import { create, detail, list, remove, update } from "../controllers/foodLogController";
import { requireAuth } from "../middleware/auth";
import { uploadFoodImage } from "../middleware/upload";
import { validate } from "../middleware/validate";
import { foodLogIdValidator, foodLogValidator, listFoodLogValidator } from "../validators/foodLogValidators";

export const foodLogRouter = Router();

foodLogRouter.use(requireAuth);
foodLogRouter.get("/", listFoodLogValidator, validate, list);
foodLogRouter.get("/search", listFoodLogValidator, validate, list);
foodLogRouter.post("/", uploadFoodImage.single("foodImage"), foodLogValidator, validate, create);
foodLogRouter.get("/:id", foodLogIdValidator, validate, detail);
foodLogRouter.put("/:id", uploadFoodImage.single("foodImage"), foodLogIdValidator, foodLogValidator, validate, update);
foodLogRouter.delete("/:id", foodLogIdValidator, validate, remove);
