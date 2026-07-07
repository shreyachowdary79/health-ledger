import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { authService } from "../services/auth";
import type { User } from "../types";

type AuthContextValue = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(localStorage.getItem("health-ledger-token"));
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("health-ledger-user");
    return stored ? JSON.parse(stored) : null;
  });

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      login: async (email, password) => {
        const result = await authService.login({ email, password });
        localStorage.setItem("health-ledger-token", result.token);
        localStorage.setItem("health-ledger-user", JSON.stringify(result.user));
        setToken(result.token);
        setUser(result.user);
      },
      register: async (name, email, password) => {
        const result = await authService.register({ name, email, password });
        localStorage.setItem("health-ledger-token", result.token);
        localStorage.setItem("health-ledger-user", JSON.stringify(result.user));
        setToken(result.token);
        setUser(result.user);
      },
      logout: () => {
        localStorage.removeItem("health-ledger-token");
        localStorage.removeItem("health-ledger-user");
        setToken(null);
        setUser(null);
      }
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
