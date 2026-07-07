import type { RequestHandler } from "express";
import {
  getDashboardSummary,
  getLowestCalorieDay,
  getLowestCalorieWeek,
  getMealDistribution,
  getMonthlyCalories,
  getWeeklyCalories
} from "../services/analyticsService";

export const weeklyCalories: RequestHandler = async (req, res, next) => {
  try {
    res.json(await getWeeklyCalories(req.user!.id));
  } catch (error) {
    next(error);
  }
};

export const monthlyCalories: RequestHandler = async (req, res, next) => {
  try {
    res.json(await getMonthlyCalories(req.user!.id));
  } catch (error) {
    next(error);
  }
};

export const lowestCalorieDay: RequestHandler = async (req, res, next) => {
  try {
    res.json(await getLowestCalorieDay(req.user!.id));
  } catch (error) {
    next(error);
  }
};

export const lowestCalorieWeek: RequestHandler = async (req, res, next) => {
  try {
    res.json(await getLowestCalorieWeek(req.user!.id));
  } catch (error) {
    next(error);
  }
};

export const mealDistribution: RequestHandler = async (req, res, next) => {
  try {
    res.json(await getMealDistribution(req.user!.id));
  } catch (error) {
    next(error);
  }
};

export const dashboard: RequestHandler = async (req, res, next) => {
  try {
    res.json(await getDashboardSummary(req.user!.id));
  } catch (error) {
    next(error);
  }
};
