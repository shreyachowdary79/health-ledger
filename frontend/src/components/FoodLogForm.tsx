import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./Button";
import type { FoodLog, FoodLogPayload } from "../types";
import { defaultTags, humanize, mealCategories, portionUnits } from "../utils/labels";

type Props = {
  initial?: FoodLog;
  onSubmit: (payload: FoodLogPayload) => Promise<void>;
  isSubmitting?: boolean;
};

export function FoodLogForm({ initial, onSubmit, isSubmitting }: Props) {
  const { register, handleSubmit, reset, watch, setValue } = useForm<FoodLogPayload>({
    defaultValues: {
      foodName: "",
      mealCategory: "BREAKFAST",
      consumedDateTime: new Date().toISOString().slice(0, 16),
      portionQuantity: 1,
      portionUnit: "SERVINGS",
      calories: 100,
      notes: "",
      tags: []
    }
  });

  useEffect(() => {
    if (initial) {
      reset({
        ...initial,
        consumedDateTime: initial.consumedDateTime.slice(0, 16),
        tags: initial.tags ?? []
      });
    }
  }, [initial, reset]);

  const selectedTags = watch("tags") ?? [];
  const tagSet = useMemo(() => new Set(selectedTags), [selectedTags]);

  function toggleTag(tag: string) {
    setValue("tags", tagSet.has(tag) ? selectedTags.filter((item) => item !== tag) : [...selectedTags, tag], { shouldDirty: true });
  }

  return (
    <form className="glass-panel grid gap-5 rounded-[32px] p-6 text-slate-100" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-200">
          Food name
          <input className="glass-input rounded-2xl px-4 py-3" {...register("foodName", { required: true })} />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-200">
          Meal category
          <select className="glass-input rounded-2xl px-4 py-3" {...register("mealCategory")}>
            {mealCategories.map((category) => (
              <option key={category} value={category}>
                {humanize(category)}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-200">
          Consumed date and time
          <input type="datetime-local" className="glass-input rounded-2xl px-4 py-3" {...register("consumedDateTime", { required: true })} />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-200">
          Calories
          <input type="number" min={1} className="glass-input rounded-2xl px-4 py-3" {...register("calories", { valueAsNumber: true, min: 1 })} />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-200">
          Portion quantity
          <input type="number" min={0.01} step="0.01" className="glass-input rounded-2xl px-4 py-3" {...register("portionQuantity", { valueAsNumber: true, min: 0.01 })} />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-200">
          Portion unit
          <select className="glass-input rounded-2xl px-4 py-3" {...register("portionUnit")}>
            {portionUnits.map((unit) => (
              <option key={unit} value={unit}>
                {humanize(unit)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-slate-200">
        Notes
        <textarea rows={4} className="glass-input rounded-2xl px-4 py-3" {...register("notes")} />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-200">
        Food image
        <input type="file" accept="image/png,image/jpeg" className="glass-input rounded-2xl px-4 py-3 text-sm" {...register("foodImage")} />
      </label>
      <div>
        <div className="text-sm font-medium text-slate-200">Tags</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {defaultTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`rounded-full border px-3 py-1 text-sm transition ${tagSet.has(tag) ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-200 shadow-glow" : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <input
          className="glass-input mt-3 w-full rounded-2xl px-4 py-3 text-sm"
          placeholder="Custom tags, comma separated"
          onBlur={(event) => {
            const custom = event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean);
            setValue("tags", [...new Set([...selectedTags, ...custom])]);
            event.target.value = "";
          }}
        />
      </div>
      <div className="flex justify-end">
        <Button className="rounded-full bg-premium text-slate-950 shadow-glow" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save food log"}</Button>
      </div>
    </form>
  );
}
