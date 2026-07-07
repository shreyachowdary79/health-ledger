import { BarChart3, LayoutDashboard, LogOut, Moon, Plus, Sun, UserRound, Utensils } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../components/AuthProvider";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/foodlogs", label: "Food Logs", icon: Utensils },
  { to: "/foodlogs/new", label: "Add", icon: Plus },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/profile", label: "Profile", icon: UserRound }
];

export function AppLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [dark, setDark] = useState(document.documentElement.classList.contains("dark"));

  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    setDark(document.documentElement.classList.contains("dark"));
  }

  return (
    <div className="min-h-screen bg-slate-50 text-ink dark:bg-slate-950 dark:text-slate-100">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white px-4 py-5 dark:border-slate-800 dark:bg-slate-900 lg:block">
        <div className="text-xl font-bold">Health Ledger</div>
        <p className="mt-1 text-sm text-slate-500">{user?.name}</p>
        <nav className="mt-8 space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-teal-50 text-mint dark:bg-teal-950" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="lg:pl-64">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
          <div className="font-semibold lg:hidden">Health Ledger</div>
          <div className="hidden text-sm text-slate-500 lg:block">Food logging MVP</div>
          <div className="flex items-center gap-2">
            <button aria-label="Toggle dark mode" className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={toggleTheme}>
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              aria-label="Log out"
              className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>
        <div className="mx-auto max-w-7xl px-4 py-6">
          <Outlet />
        </div>
        <nav className="fixed inset-x-0 bottom-0 grid grid-cols-5 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:hidden">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className="flex flex-col items-center gap-1 px-2 py-2 text-xs">
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </main>
    </div>
  );
}
