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
    <div className="min-h-screen text-slate-100">
      <div className="pointer-events-none fixed inset-0 premium-grid opacity-40" />
      <div className="pointer-events-none fixed inset-0 bg-aurora opacity-60" />
      <aside className="fixed inset-y-4 left-4 z-30 hidden w-72 glass-panel rounded-[28px] px-4 py-5 lg:flex lg:flex-col">
        <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
          <div className="text-xl font-semibold tracking-tight">Health Ledger</div>
          <p className="mt-1 text-sm text-slate-400">{user?.name}</p>
        </div>
        <nav className="mt-6 space-y-2">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${isActive ? "bg-white/10 text-white shadow-glow" : "text-slate-300 hover:bg-white/5 hover:text-white"}`
              }
            >
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 text-emerald-300 transition group-hover:bg-emerald-400/15">
                <Icon size={18} />
              </span>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
          <p className="font-medium text-white">Signed in</p>
          <p className="mt-1">{user?.email}</p>
        </div>
      </aside>
      <main className="relative lg:pl-[20.75rem]">
        <header className="sticky top-0 z-20 px-4 pt-4">
          <div className="glass-panel flex items-center justify-between rounded-[28px] px-4 py-3">
            <div>
              <div className="text-sm uppercase tracking-[0.3em] text-emerald-300/80">Premium Health Intelligence</div>
              <div className="text-lg font-semibold text-white lg:hidden">Health Ledger</div>
            </div>
            <div className="hidden max-w-xl flex-1 px-6 lg:block">
              <label className="relative block">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">⌘K</span>
                <input className="glass-input w-full rounded-full py-3 pl-16 pr-4 text-sm" placeholder="Search insights, reports, appointments..." />
              </label>
            </div>
            <div className="flex items-center gap-2">
              <button aria-label="Toggle dark mode" className="glass-input rounded-full p-3" onClick={toggleTheme}>
              {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button aria-label="Notifications" className="glass-input rounded-full p-3">•</button>
              <button
                aria-label="Log out"
                className="glass-input rounded-full p-3"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>
        <div className="relative mx-auto max-w-7xl px-4 py-6 pb-24 lg:pb-8">
          <Outlet />
        </div>
        <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-5 gap-2 glass-panel rounded-[24px] p-2 lg:hidden">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs text-slate-300">
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </main>
    </div>
  );
}
