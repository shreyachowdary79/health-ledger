export type User = {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
};

export type MealCategory =
  | "BREAKFAST"
  | "LUNCH"
  | "DINNER"
  | "MORNING_SNACK"
  | "EVENING_SNACK"
  | "LATE_NIGHT_SNACK";

export type PortionUnit = "G" | "ML" | "PIECES" | "SERVINGS" | "BOWLS" | "CUPS";

export type FoodLog = {
  id: string;
  foodName: string;
  mealCategory: MealCategory;
  consumedDateTime: string;
  portionQuantity: number;
  portionUnit: PortionUnit;
  calories: number;
  notes?: string | null;
  foodImageUrl?: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type FoodLogPayload = Omit<FoodLog, "id" | "createdAt" | "updatedAt" | "tags"> & {
  tags: string[];
  foodImage?: FileList;
};

export type Paginated<T> = {
  items: T[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
};
