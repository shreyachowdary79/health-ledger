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
    <form className="grid gap-5 rounded-md bg-white p-5 shadow-soft dark:bg-slate-900" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium">
          Food name
          <input className="rounded-md border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700" {...register("foodName", { required: true })} />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Meal category
          <select className="rounded-md border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700" {...register("mealCategory")}>
            {mealCategories.map((category) => (
              <option key={category} value={category}>
                {humanize(category)}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Consumed date and time
          <input type="datetime-local" className="rounded-md border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700" {...register("consumedDateTime", { required: true })} />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Calories
          <input type="number" min={1} className="rounded-md border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700" {...register("calories", { valueAsNumber: true, min: 1 })} />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Portion quantity
          <input type="number" min={0.01} step="0.01" className="rounded-md border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700" {...register("portionQuantity", { valueAsNumber: true, min: 0.01 })} />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Portion unit
          <select className="rounded-md border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700" {...register("portionUnit")}>
            {portionUnits.map((unit) => (
              <option key={unit} value={unit}>
                {humanize(unit)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-1 text-sm font-medium">
        Notes
        <textarea rows={4} className="rounded-md border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700" {...register("notes")} />
      </label>
      <label className="grid gap-1 text-sm font-medium">
        Food image
        <input type="file" accept="image/png,image/jpeg" className="rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm dark:border-slate-700" {...register("foodImage")} />
      </label>
      <div>
        <div className="text-sm font-medium">Tags</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {defaultTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`rounded-md border px-3 py-1 text-sm ${tagSet.has(tag) ? "border-mint bg-teal-50 text-mint dark:bg-teal-950" : "border-slate-300 dark:border-slate-700"}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <input
          className="mt-3 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm dark:border-slate-700"
          placeholder="Custom tags, comma separated"
          onBlur={(event) => {
            const custom = event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean);
            setValue("tags", [...new Set([...selectedTags, ...custom])]);
            event.target.value = "";
          }}
        />
      </div>
      <div className="flex justify-end">
        <Button disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save food log"}</Button>
      </div>
    </form>
  );
}
