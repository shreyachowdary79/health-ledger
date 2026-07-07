import { MealCategory, PortionUnit, Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";
import { ApiError } from "../utils/apiError";

type FoodLogInput = {
  foodName: string;
  mealCategory: MealCategory;
  consumedDateTime: string;
  portionQuantity: number;
  portionUnit: PortionUnit;
  calories: number;
  notes?: string | null;
  tags?: string[];
  foodImageUrl?: string;
};

type FoodLogQuery = {
  page?: number;
  limit?: number;
  q?: string;
  mealCategory?: string;
  startDate?: string;
  endDate?: string;
  minCalories?: number;
  maxCalories?: number;
  tags?: string | string[];
  sortBy?: "date" | "calories" | "foodName";
  sortOrder?: "asc" | "desc";
};

const includeTags = { tags: { include: { tag: true } } };

function normalizeTags(tags?: string[]) {
  return [...new Set((tags ?? []).map((tag) => tag.trim()).filter(Boolean))];
}

function serializeFoodLog<T extends { tags?: { tag: { name: string } }[] }>(foodLog: T) {
  return { ...foodLog, tags: foodLog.tags?.map((entry) => entry.tag.name) ?? [] };
}

async function buildTagRelations(tagNames?: string[]) {
  const normalized = normalizeTags(tagNames);
  return Promise.all(
    normalized.map(async (name) => {
      const tag = await prisma.tag.upsert({
        where: { name },
        create: { name },
        update: {}
      });
      return { tagId: tag.id };
    })
  );
}

function buildWhere(userId: string, query: FoodLogQuery): Prisma.FoodLogWhereInput {
  const tagValues = Array.isArray(query.tags) ? query.tags : query.tags?.split(",");
  const where: Prisma.FoodLogWhereInput = {
    userId,
    isDeleted: false
  };

  if (query.q) {
    where.OR = [
      { foodName: { contains: query.q, mode: "insensitive" } },
      { notes: { contains: query.q, mode: "insensitive" } },
      { tags: { some: { tag: { name: { contains: query.q, mode: "insensitive" } } } } }
    ];
  }

  if (query.mealCategory) where.mealCategory = query.mealCategory as never;
  if (query.startDate || query.endDate) {
    where.consumedDateTime = {
      gte: query.startDate ? new Date(query.startDate) : undefined,
      lte: query.endDate ? new Date(query.endDate) : undefined
    };
  }
  if (query.minCalories || query.maxCalories) {
    where.calories = {
      gte: query.minCalories ? Number(query.minCalories) : undefined,
      lte: query.maxCalories ? Number(query.maxCalories) : undefined
    };
  }
  if (tagValues?.length) {
    where.tags = { some: { tag: { name: { in: tagValues.map((tag) => tag.trim()) } } } };
  }

  return where;
}

function buildOrderBy(sortBy: FoodLogQuery["sortBy"], sortOrder: FoodLogQuery["sortOrder"]): Prisma.FoodLogOrderByWithRelationInput {
  const direction = sortOrder ?? "desc";
  if (sortBy === "calories") return { calories: direction };
  if (sortBy === "foodName") return { foodName: direction };
  return { consumedDateTime: direction };
}

export async function createFoodLog(userId: string, input: FoodLogInput) {
  const tagRelations = await buildTagRelations(input.tags);
  const foodLog = await prisma.foodLog.create({
    data: {
      userId,
      foodName: input.foodName,
      mealCategory: input.mealCategory,
      consumedDateTime: new Date(input.consumedDateTime),
      portionQuantity: input.portionQuantity,
      portionUnit: input.portionUnit,
      calories: input.calories,
      notes: input.notes,
      foodImageUrl: input.foodImageUrl,
      tags: { create: tagRelations }
    },
    include: includeTags
  });
  return serializeFoodLog(foodLog);
}

export async function listFoodLogs(userId: string, query: FoodLogQuery) {
  const page = query.page ?? 1;
  const limit = query.limit ?? 10;
  const where = buildWhere(userId, query);
  const [items, total] = await prisma.$transaction([
    prisma.foodLog.findMany({
      where,
      include: includeTags,
      orderBy: buildOrderBy(query.sortBy, query.sortOrder),
      skip: (page - 1) * limit,
      take: limit
    }),
    prisma.foodLog.count({ where })
  ]);

  return {
    items: items.map(serializeFoodLog),
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
  };
}

export async function getFoodLog(userId: string, id: string) {
  const foodLog = await prisma.foodLog.findFirst({ where: { id, userId, isDeleted: false }, include: includeTags });
  if (!foodLog) throw new ApiError(404, "Food log not found");
  return serializeFoodLog(foodLog);
}

export async function updateFoodLog(userId: string, id: string, input: FoodLogInput) {
  await getFoodLog(userId, id);
  const tagRelations = await buildTagRelations(input.tags);

  const foodLog = await prisma.$transaction(async (tx) => {
    await tx.foodLogTag.deleteMany({ where: { foodLogId: id } });
    return tx.foodLog.update({
      where: { id },
      data: {
        foodName: input.foodName,
        mealCategory: input.mealCategory,
        consumedDateTime: new Date(input.consumedDateTime),
        portionQuantity: input.portionQuantity,
        portionUnit: input.portionUnit,
        calories: input.calories,
        notes: input.notes,
        foodImageUrl: input.foodImageUrl,
        tags: { create: tagRelations }
      },
      include: includeTags
    });
  });

  return serializeFoodLog(foodLog);
}

export async function deleteFoodLog(userId: string, id: string) {
  await getFoodLog(userId, id);
  await prisma.foodLog.update({ where: { id }, data: { isDeleted: true } });
}
