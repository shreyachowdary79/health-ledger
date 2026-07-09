import { body, param, query } from "express-validator";
import { MealCategory, PortionUnit } from "@prisma/client";

export const foodLogIdValidator = [param("id").isUUID().withMessage("Food log id must be a UUID")];

export const foodLogValidator = [
  body("foodName").trim().notEmpty().withMessage("Food name is required"),
  body("mealCategory").isIn(Object.values(MealCategory)).withMessage("Meal category is invalid"),
  body("consumedDateTime").custom((value) => {
    if (!value) throw new Error("Consumed date and time is required");
    const date = new Date(value);
    if (isNaN(date.getTime())) throw new Error("Consumed date and time must be a valid date");
    return true;
  }),
  body("portionQuantity").toFloat().isFloat({ gt: 0 }).withMessage("Portion quantity must be greater than 0"),
  body("portionUnit").isIn(Object.values(PortionUnit)).withMessage("Portion unit is invalid"),
  body("calories").toInt().isInt({ min: 1 }).withMessage("Calories must be at least 1"),
  body("notes").optional({ nullable: true }).trim().isLength({ max: 1000 }),
  body("tags").optional().customSanitizer((value) => {
    if (Array.isArray(value)) return value;
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : value.split(",").map((item) => item.trim());
      } catch {
        return value.split(",").map((item) => item.trim());
      }
    }
    return [];
  })
];

export const listFoodLogValidator = [
  query("page").optional().toInt().isInt({ min: 1 }),
  query("limit").optional().toInt().isInt({ min: 1, max: 100 }),
  query("minCalories").optional().toInt().isInt({ min: 1 }),
  query("maxCalories").optional().toInt().isInt({ min: 1 }),
  query("sortBy").optional().isIn(["date", "calories", "foodName"]),
  query("sortOrder").optional().isIn(["asc", "desc"])
];
