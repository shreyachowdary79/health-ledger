import { Router } from "express";
import { login, logout, profile, register } from "../controllers/authController";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { loginValidator, registerValidator } from "../validators/authValidators";

export const authRouter = Router();

authRouter.post("/register", registerValidator, validate, register);
authRouter.post("/login", loginValidator, validate, login);
authRouter.post("/logout", requireAuth, logout);
authRouter.get("/profile", requireAuth, profile);
