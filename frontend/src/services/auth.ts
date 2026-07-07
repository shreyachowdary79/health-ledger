import { api } from "./api";
import type { User } from "../types";

export type AuthResponse = { user: User; token: string };

export const authService = {
  register: async (payload: { name: string; email: string; password: string }) =>
    (await api.post<AuthResponse>("/auth/register", payload)).data,
  login: async (payload: { email: string; password: string }) => (await api.post<AuthResponse>("/auth/login", payload)).data,
  profile: async () => (await api.get<{ user: User }>("/auth/profile")).data.user,
  logout: async () => api.post("/auth/logout")
};
