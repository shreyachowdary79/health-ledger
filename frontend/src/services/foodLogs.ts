import { api } from "./api";
import type { FoodLog, FoodLogPayload, Paginated } from "../types";

function toFormData(payload: FoodLogPayload) {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (key === "foodImage" && value instanceof FileList && value[0]) {
      formData.append("foodImage", value[0]);
      return;
    }
    if (key === "tags") {
      formData.append("tags", JSON.stringify(value));
      return;
    }
    if (key === "consumedDateTime" && value) {
      // Ensure we always send a full ISO string (datetime-local gives "YYYY-MM-DDTHH:mm")
      formData.append("consumedDateTime", new Date(value as string).toISOString());
      return;
    }
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  return formData;
}

export const foodLogService = {
  list: async (params?: Record<string, unknown>) => (await api.get<Paginated<FoodLog>>("/foodlogs", { params })).data,
  search: async (params?: Record<string, unknown>) => (await api.get<Paginated<FoodLog>>("/foodlogs/search", { params })).data,
  get: async (id: string) => (await api.get<FoodLog>(`/foodlogs/${id}`)).data,
  create: async (payload: FoodLogPayload) => (await api.post<FoodLog>("/foodlogs", toFormData(payload))).data,
  update: async (id: string, payload: FoodLogPayload) => (await api.put<FoodLog>(`/foodlogs/${id}`, toFormData(payload))).data,
  remove: async (id: string) => api.delete(`/foodlogs/${id}`)
};
