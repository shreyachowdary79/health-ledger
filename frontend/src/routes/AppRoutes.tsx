import { Navigate, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../components/AuthProvider";
import { AppLayout } from "../layouts/AppLayout";
import { AnalyticsPage } from "../pages/AnalyticsPage";
import { DashboardPage } from "../pages/DashboardPage";
import { FoodLogDetailPage } from "../pages/FoodLogDetailPage";
import { FoodLogFormPage } from "../pages/FoodLogFormPage";
import { FoodLogListPage } from "../pages/FoodLogListPage";
import { LoginPage } from "../pages/LoginPage";
import { ProfilePage } from "../pages/ProfilePage";
import { RegisterPage } from "../pages/RegisterPage";

function Protected({ children }: { children: ReactNode }) {
  const { token, isReady } = useAuth();
  if (!isReady) {
    return <div className="grid min-h-screen place-items-center text-sm text-slate-500">Checking your session...</div>;
  }
  return token ? children : <Navigate to="/login" replace />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        element={
          <Protected>
            <AppLayout />
          </Protected>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="/foodlogs" element={<FoodLogListPage />} />
        <Route path="/foodlogs/new" element={<FoodLogFormPage />} />
        <Route path="/foodlogs/:id" element={<FoodLogDetailPage />} />
        <Route path="/foodlogs/:id/edit" element={<FoodLogFormPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}
