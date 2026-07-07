import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { FoodLogForm } from "../components/FoodLogForm";
import { ErrorState, LoadingState } from "../components/State";
import { foodLogService } from "../services/foodLogs";
import type { FoodLogPayload } from "../types";
import { useAsync } from "../hooks/useAsync";

export function FoodLogFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);
  const state = useAsync(() => (id ? foodLogService.get(id) : Promise.resolve(null)), [id]);

  async function submit(payload: FoodLogPayload) {
    setSubmitting(true);
    try {
      const result = id ? await foodLogService.update(id, payload) : await foodLogService.create(payload);
      toast.success("Food log saved");
      navigate(`/foodlogs/${result.id}`);
    } catch {
      toast.error("Unable to save food log");
    } finally {
      setSubmitting(false);
    }
  }

  if (id && state.isLoading) return <LoadingState />;
  if (id && state.error) return <ErrorState message={state.error} />;

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold">{id ? "Edit Food Log" : "Add Food Log"}</h1>
      <FoodLogForm initial={state.data ?? undefined} isSubmitting={isSubmitting} onSubmit={submit} />
    </div>
  );
}
