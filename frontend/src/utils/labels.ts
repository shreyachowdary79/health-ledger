export const mealCategories = [
  "BREAKFAST",
  "LUNCH",
  "DINNER",
  "MORNING_SNACK",
  "EVENING_SNACK",
  "LATE_NIGHT_SNACK"
] as const;

export const portionUnits = ["G", "ML", "PIECES", "SERVINGS", "BOWLS", "CUPS"] as const;

export const defaultTags = [
  "Healthy",
  "High Protein",
  "Low Carb",
  "Weight Loss",
  "Cheat Meal",
  "Homemade",
  "Restaurant",
  "Post Workout"
];

export function humanize(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
