import type { ReactNode } from "react";
import { Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ErrorState, LoadingState } from "../components/State";
import { analyticsService } from "../services/analytics";
import { useAsync } from "../hooks/useAsync";
import { humanize } from "../utils/labels";

const colors = ["#34d399", "#22d3ee", "#60a5fa", "#a78bfa", "#f59e0b", "#fb7185"];

export function AnalyticsPage() {
  const weekly = useAsync(() => analyticsService.weeklyCalories(), []);
  const monthly = useAsync(() => analyticsService.monthlyCalories(), []);
  const distribution = useAsync(() => analyticsService.mealDistribution(), []);
  const lowestDay = useAsync(() => analyticsService.lowestCalorieDay(), []);
  const lowestWeek = useAsync(() => analyticsService.lowestCalorieWeek(), []);

  if (weekly.isLoading || monthly.isLoading || distribution.isLoading) return <LoadingState label="Loading analytics..." />;
  if (weekly.error || monthly.error || distribution.error) return <ErrorState message="Analytics unavailable" />;

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold text-white">Analytics</h1>
      <section className="grid gap-4 md:grid-cols-2">
        <div className="glass-panel rounded-[28px] p-5">
          <p className="text-sm text-slate-400">Lowest Calorie Day</p>
          <p className="mt-2 text-xl font-semibold text-white">
            {lowestDay.data?.date ?? "No data"} · {lowestDay.data?.calories ?? 0} cal
          </p>
        </div>
        <div className="glass-panel rounded-[28px] p-5">
          <p className="text-sm text-slate-400">Lowest Calorie Week</p>
          <p className="mt-2 text-xl font-semibold text-white">
            {lowestWeek.data?.weekRange ?? "No data"} · {lowestWeek.data?.totalCalories ?? 0} cal
          </p>
        </div>
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Weekly Calorie Trend">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={weekly.data ?? []}>
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,0.14)", borderRadius: 16 }} />
              <Line type="monotone" dataKey="calories" stroke="#34d399" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Monthly Calorie Trend">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthly.data ?? []}>
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,0.14)", borderRadius: 16 }} />
              <Line type="monotone" dataKey="calories" stroke="#22d3ee" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Meal Category Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={distribution.data ?? []} dataKey="percentage" nameKey="mealCategory" label={(entry) => humanize(entry.mealCategory)}>
                {(distribution.data ?? []).map((entry, index) => (
                  <Cell key={entry.mealCategory} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,0.14)", borderRadius: 16 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="glass-panel rounded-[28px] p-5">
      <h2 className="mb-4 font-semibold text-white">{title}</h2>
      {children}
    </div>
  );
}
