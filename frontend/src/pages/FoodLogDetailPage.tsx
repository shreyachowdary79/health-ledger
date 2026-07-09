import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { ErrorState, LoadingState } from "../components/State";
import { foodLogService } from "../services/foodLogs";
import { useAsync } from "../hooks/useAsync";
import { humanize } from "../utils/labels";

export function FoodLogDetailPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useAsync(() => foodLogService.get(id), [id]);

  if (isLoading) return <LoadingState />;
  if (error || !data) return <ErrorState message={error ?? "Food log unavailable"} />;

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-white">{data.foodName}</h1>
        <div className="flex gap-2">
          <Link to={`/foodlogs/${data.id}/edit`}>
            <Button className="rounded-full bg-white/10 text-white hover:bg-white/15">Edit</Button>
          </Link>
          <Button
            className="rounded-full bg-rose-500/90 text-white hover:bg-rose-500"
            onClick={async () => {
              await foodLogService.remove(data.id);
              toast.success("Food log deleted");
              navigate("/foodlogs");
            }}
          >
            Delete
          </Button>
        </div>
      </div>
      <section className="glass-panel grid gap-4 rounded-[28px] p-5 md:grid-cols-2">
        <p><strong>Meal:</strong> {humanize(data.mealCategory)}</p>
        <p><strong>Calories:</strong> {data.calories}</p>
        <p><strong>Portion:</strong> {data.portionQuantity} {humanize(data.portionUnit)}</p>
        <p><strong>Consumed:</strong> {new Date(data.consumedDateTime).toLocaleString()}</p>
        <p className="md:col-span-2"><strong>Notes:</strong> {data.notes || "None"}</p>
        <div className="md:col-span-2 flex flex-wrap gap-2">
          {data.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-white/5 px-2 py-1 text-sm text-slate-300">{tag}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
