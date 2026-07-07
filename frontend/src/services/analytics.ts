import { api } from "./api";
import type { FoodLog } from "../types";

export type TrendPoint = { date: string; calories: number };
export type MealDistribution = { mealCategory: string; calories: number; percentage: number };

export const analyticsService = {
  dashboard: async () =>
    (
      await api.get<{
        todayCalories: number;
        weeklyCalories: number;
        totalFoodLogs: number;
        currentLoggingStreak: number;
        recentFoodEntries: FoodLog[];
        quickInsights: string[];
      }>("/analytics/dashboard")
    ).data,
  weeklyCalories: async () => (await api.get<TrendPoint[]>("/analytics/weekly-calories")).data,
  monthlyCalories: async () => (await api.get<TrendPoint[]>("/analytics/monthly-calories")).data,
  lowestCalorieDay: async () => (await api.get<{ date: string; calories: number }>("/analytics/lowest-calorie-day")).data,
  lowestCalorieWeek: async () => (await api.get<{ weekRange: string; totalCalories: number }>("/analytics/lowest-calorie-week")).data,
  mealDistribution: async () => (await api.get<MealDistribution[]>("/analytics/meal-distribution")).data
};
