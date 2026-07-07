import type { RequestHandler } from "express";
import { createFoodLog, deleteFoodLog, getFoodLog, listFoodLogs, updateFoodLog } from "../services/foodLogService";

function bodyWithImage(req: Parameters<RequestHandler>[0]) {
  return {
    ...req.body,
    portionQuantity: Number(req.body.portionQuantity),
    calories: Number(req.body.calories),
    foodImageUrl: req.file ? `/uploads/food-images/${req.file.filename}` : req.body.foodImageUrl
  };
}

export const create: RequestHandler = async (req, res, next) => {
  try {
    res.status(201).json(await createFoodLog(req.user!.id, bodyWithImage(req)));
  } catch (error) {
    next(error);
  }
};

export const list: RequestHandler = async (req, res, next) => {
  try {
    res.json(await listFoodLogs(req.user!.id, req.query));
  } catch (error) {
    next(error);
  }
};

export const detail: RequestHandler = async (req, res, next) => {
  try {
    res.json(await getFoodLog(req.user!.id, String(req.params.id)));
  } catch (error) {
    next(error);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  try {
    res.json(await updateFoodLog(req.user!.id, String(req.params.id), bodyWithImage(req)));
  } catch (error) {
    next(error);
  }
};

export const remove: RequestHandler = async (req, res, next) => {
  try {
    await deleteFoodLog(req.user!.id, String(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
