import { Link } from "react-router-dom";
import { PremiumButton, GlassButton } from "../components/Button";
import { EmptyState, ErrorState, LoadingState } from "../components/State";
import { analyticsService } from "../services/analytics";
import { useAsync } from "../hooks/useAsync";

export function DashboardPage() {
  const { data, isLoading, error } = useAsync(() => analyticsService.dashboard(), []);
  if (isLoading) return <LoadingState label="Loading dashboard..." />;
  if (error || !data) return <ErrorState message={error ?? "Dashboard unavailable"} />;

  const stats = [
    ["Today's Calories", data.todayCalories],
    ["Weekly Calories", data.weeklyCalories],
    ["Total Food Logs", data.totalFoodLogs],
    ["Logging Streak", `${data.currentLoggingStreak} days`]
  ];

  return (
    <div className="grid gap-6">
      <section className="glass-panel overflow-hidden rounded-[32px] p-6 lg:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-300/80">Welcome Back</p>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-white lg:text-5xl">Your healthcare dashboard is ready.</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">Track nutrition, review insights, and keep your care records organized in one premium workspace.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/foodlogs/new"><PremiumButton>Upload Report</PremiumButton></Link>
              <Link to="/analytics"><GlassButton>AI Analysis</GlassButton></Link>
              <Link to="/foodlogs"><GlassButton>Medical Records</GlassButton></Link>
              <Link to="/profile"><GlassButton>Appointments</GlassButton></Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-emerald-400/20 via-cyan-400/10 to-slate-950 p-5 shadow-glow">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_35%)]" />
            <div className="relative grid h-full place-items-center rounded-[24px] border border-white/10 bg-slate-950/55 p-8">
              <div className="grid gap-3 text-center">
                <p className="text-sm text-slate-400">Animated visual</p>
                <div className="mx-auto h-40 w-40 rounded-full border border-emerald-400/20 bg-emerald-400/10 blur-[1px] animate-float" />
                <p className="text-sm text-slate-300">Liquid-like health intelligence</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-white">Dashboard overview</h2>
          <p className="text-sm text-slate-400">A quick read on your recent health logging.</p>
        </div>
        <Link to="/foodlogs/new">
          <PremiumButton>Add food</PremiumButton>
        </Link>
      </div>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value]) => (
          <div key={label} className="glass-panel rounded-[28px] p-5">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel rounded-[28px] p-5">
          <h2 className="font-semibold text-white">Recent Food Entries</h2>
          <div className="mt-4 grid gap-3">
            {data.recentFoodEntries.length === 0 ? (
              <EmptyState title="No food logs yet" />
            ) : (
              data.recentFoodEntries.map((entry) => (
                <Link key={entry.id} to={`/foodlogs/${entry.id}`} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200 transition hover:-translate-y-0.5 hover:bg-white/10">
                  <span>{entry.foodName}</span>
                  <strong className="text-emerald-300">{entry.calories} cal</strong>
                </Link>
              ))
            )}
          </div>
        </div>
        <div className="glass-panel rounded-[28px] p-5">
          <h2 className="font-semibold text-white">Quick Insights</h2>
          <ul className="mt-4 grid gap-3 text-sm text-slate-300">
            {data.quickInsights.map((insight) => (
              <li key={insight} className="rounded-2xl border border-white/8 bg-white/5 p-3">
                {insight}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
