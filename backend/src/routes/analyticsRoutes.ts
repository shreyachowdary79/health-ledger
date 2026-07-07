import { Router } from "express";
import {
  dashboard,
  lowestCalorieDay,
  lowestCalorieWeek,
  mealDistribution,
  monthlyCalories,
  weeklyCalories
} from "../controllers/analyticsController";
import { requireAuth } from "../middleware/auth";

export const analyticsRouter = Router();

analyticsRouter.use(requireAuth);
analyticsRouter.get("/dashboard", dashboard);
analyticsRouter.get("/weekly-calories", weeklyCalories);
analyticsRouter.get("/monthly-calories", monthlyCalories);
analyticsRouter.get("/lowest-calorie-day", lowestCalorieDay);
analyticsRouter.get("/lowest-calorie-week", lowestCalorieWeek);
analyticsRouter.get("/meal-distribution", mealDistribution);
