import type { RequestHandler } from "express";
import { loginUser, registerUser } from "../services/authService";

export const register: RequestHandler = async (req, res, next) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    res.json(await loginUser(req.body));
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (_req, res) => {
  res.status(204).send();
};

export const profile: RequestHandler = (req, res) => {
  res.json({ user: req.user });
};
