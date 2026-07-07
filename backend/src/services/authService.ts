import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";
import { ApiError } from "../utils/apiError";
import { signAccessToken } from "../utils/jwt";

export async function registerUser(input: { name: string; email: string; password: string }) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) {
    throw new ApiError(409, "Email is already registered");
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await prisma.user.create({
    data: { name: input.name, email: input.email, passwordHash },
    select: { id: true, name: true, email: true, createdAt: true, updatedAt: true }
  });

  return { user, token: signAccessToken({ sub: user.id, email: user.email }) };
}

export async function loginUser(input: { email: string; password: string }) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) {
    throw new ApiError(401, "Invalid email or password");
  }

  return {
    user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt },
    token: signAccessToken({ sub: user.id, email: user.email })
  };
}
