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
        <h1 className="text-2xl font-bold">Food Logs</h1>
        <Link to="/foodlogs/new">
          <Button>Add food</Button>
        </Link>
      </div>
      <div className="grid gap-3 rounded-md bg-white p-4 shadow-soft dark:bg-slate-900 md:grid-cols-4">
        <label className="relative md:col-span-2">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input className="w-full rounded-md border border-slate-300 bg-transparent py-2 pl-10 pr-3 dark:border-slate-700" placeholder="Search food, notes, tags" value={filters.q} onChange={(event) => setFilters({ ...filters, q: event.target.value })} />
        </label>
        <select className="rounded-md border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700" value={filters.mealCategory} onChange={(event) => setFilters({ ...filters, mealCategory: event.target.value })}>
          <option value="">All meals</option>
          {mealCategories.map((category) => (
            <option key={category} value={category}>
              {humanize(category)}
            </option>
          ))}
        </select>
        <select className="rounded-md border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700" value={filters.sortBy} onChange={(event) => setFilters({ ...filters, sortBy: event.target.value })}>
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
          <Link key={entry.id} to={`/foodlogs/${entry.id}`} className="grid gap-2 rounded-md bg-white p-4 shadow-soft transition hover:translate-y-[-1px] dark:bg-slate-900 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-semibold">{entry.foodName}</h2>
              <p className="text-sm text-slate-500">{humanize(entry.mealCategory)} - {new Date(entry.consumedDateTime).toLocaleString()}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-xs dark:bg-slate-800">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <strong className="text-lg text-mint">{entry.calories} cal</strong>
          </Link>
        ))}
      </div>
    </div>
  );
}
