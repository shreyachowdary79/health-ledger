import { Link } from "react-router-dom";
import { Button } from "../components/Button";
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
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-slate-500">A quick read on your recent food logging.</p>
        </div>
        <Link to="/foodlogs/new">
          <Button>Add food</Button>
        </Link>
      </div>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-md bg-white p-5 shadow-soft dark:bg-slate-900">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-bold">{value}</p>
          </div>
        ))}
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-md bg-white p-5 shadow-soft dark:bg-slate-900">
          <h2 className="font-semibold">Recent Food Entries</h2>
          <div className="mt-4 grid gap-3">
            {data.recentFoodEntries.length === 0 ? (
              <EmptyState title="No food logs yet" />
            ) : (
              data.recentFoodEntries.map((entry) => (
                <Link key={entry.id} to={`/foodlogs/${entry.id}`} className="flex items-center justify-between rounded-md border border-slate-200 p-3 text-sm dark:border-slate-800">
                  <span>{entry.foodName}</span>
                  <strong>{entry.calories} cal</strong>
                </Link>
              ))
            )}
          </div>
        </div>
        <div className="rounded-md bg-white p-5 shadow-soft dark:bg-slate-900">
          <h2 className="font-semibold">Quick Insights</h2>
          <ul className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
            {data.quickInsights.map((insight) => (
              <li key={insight} className="rounded-md bg-slate-50 p-3 dark:bg-slate-800">
                {insight}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
