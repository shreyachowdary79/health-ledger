import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, it } from "vitest";
import { AuthProvider } from "../components/AuthProvider";
import { AppRoutes } from "../routes/AppRoutes";

it("renders the login page for unauthenticated users", () => {
  localStorage.clear();
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </MemoryRouter>
  );

  expect(screen.getByText("Health Ledger")).toBeInTheDocument();
});
