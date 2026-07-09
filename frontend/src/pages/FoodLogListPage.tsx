import { Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { EmptyState, ErrorState, LoadingState } from "../components/State";
import { foodLogService } from "../services/foodLogs";
import { useAsync } from "../hooks/useAsync";
import { humanize, mealCategories } from "../utils/labels";

export function FoodLogListPage() {
  const [filters, setFilters] = useState({ q: "", mealCategory: "", sortBy: "date", sortOrder: "desc" });
  const { data, isLoading, error } = useAsync(() => foodLogService.search(filters), [JSON.stringify(filters)]);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-white">Food Logs</h1>
        <Link to="/foodlogs/new">
          <Button className="rounded-full bg-premium text-slate-950 shadow-glow">Add food</Button>
        </Link>
      </div>
      <div className="glass-panel grid gap-3 rounded-[28px] p-4 md:grid-cols-4">
        <label className="relative md:col-span-2">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input className="glass-input w-full rounded-2xl py-3 pl-10 pr-3" placeholder="Search food, notes, tags" value={filters.q} onChange={(event) => setFilters({ ...filters, q: event.target.value })} />
        </label>
        <select className="glass-input rounded-2xl px-3 py-2" value={filters.mealCategory} onChange={(event) => setFilters({ ...filters, mealCategory: event.target.value })}>
          <option value="">All meals</option>
          {mealCategories.map((category) => (
            <option key={category} value={category}>
              {humanize(category)}
            </option>
          ))}
        </select>
        <select className="glass-input rounded-2xl px-3 py-2" value={filters.sortBy} onChange={(event) => setFilters({ ...filters, sortBy: event.target.value })}>
          <option value="date">Date</option>
          <option value="calories">Calories</option>
          <option value="foodName">Food Name</option>
        </select>
      </div>
      {isLoading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {data && data.items.length === 0 && <EmptyState title="No matching food logs" />}
      <div className="grid gap-3">
        {data?.items.map((entry) => (
          <Link key={entry.id} to={`/foodlogs/${entry.id}`} className="grid gap-2 rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-soft transition hover:-translate-y-0.5 hover:bg-white/10 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-semibold text-white">{entry.foodName}</h2>
              <p className="text-sm text-slate-400">{humanize(entry.mealCategory)} - {new Date(entry.consumedDateTime).toLocaleString()}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/5 px-2 py-1 text-xs text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <strong className="text-lg text-emerald-300">{entry.calories} cal</strong>
          </Link>
        ))}
      </div>
    </div>
  );
}
