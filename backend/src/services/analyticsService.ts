import { MealCategory } from "@prisma/client";
import { prisma } from "../config/prisma";

function startOfDay(date: Date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

async function caloriesByDay(userId: string, start: Date, end: Date) {
  const rows = await prisma.foodLog.groupBy({
    by: ["consumedDateTime"],
    where: { userId, isDeleted: false, consumedDateTime: { gte: start, lte: end } },
    _sum: { calories: true }
  });

  const totals = new Map<string, number>();
  rows.forEach((row) => {
    const key = toDateKey(row.consumedDateTime);
    totals.set(key, (totals.get(key) ?? 0) + (row._sum.calories ?? 0));
  });
  return totals;
}

export async function getWeeklyCalories(userId: string) {
  const end = new Date();
  const start = startOfDay(new Date());
  start.setDate(start.getDate() - 6);
  const totals = await caloriesByDay(userId, start, end);

  return Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return { date: toDateKey(date), calories: totals.get(toDateKey(date)) ?? 0 };
  });
}

export async function getMonthlyCalories(userId: string) {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  const totals = await caloriesByDay(userId, start, end);
  const days = end.getDate();

  return Array.from({ length: days }).map((_, index) => {
    const date = new Date(start);
    date.setDate(index + 1);
    return { date: toDateKey(date), calories: totals.get(toDateKey(date)) ?? 0 };
  });
}

export async function getLowestCalorieDay(userId: string) {
  const weekly = await getWeeklyCalories(userId);
  return weekly.reduce((lowest, day) => (day.calories < lowest.calories ? day : lowest), weekly[0]);
}

export async function getLowestCalorieWeek(userId: string) {
  const end = new Date();
  const weeks = await Promise.all(
    Array.from({ length: 4 }).map(async (_, index) => {
      const weekEnd = startOfDay(new Date(end));
      weekEnd.setDate(weekEnd.getDate() - index * 7);
      weekEnd.setHours(23, 59, 59, 999);
      const weekStart = startOfDay(new Date(weekEnd));
      weekStart.setDate(weekStart.getDate() - 6);
      const aggregate = await prisma.foodLog.aggregate({
        where: { userId, isDeleted: false, consumedDateTime: { gte: weekStart, lte: weekEnd } },
        _sum: { calories: true }
      });
      return {
        weekRange: `${toDateKey(weekStart)} to ${toDateKey(weekEnd)}`,
        totalCalories: aggregate._sum.calories ?? 0
      };
    })
  );

  return weeks.reduce((lowest, week) => (week.totalCalories < lowest.totalCalories ? week : lowest), weeks[0]);
}

export async function getMealDistribution(userId: string) {
  const rows = await prisma.foodLog.groupBy({
    by: ["mealCategory"],
    where: { userId, isDeleted: false },
    _sum: { calories: true }
  });
  const total = rows.reduce((sum, row) => sum + (row._sum.calories ?? 0), 0);

  return Object.values(MealCategory).map((category) => {
    const calories = rows.find((row) => row.mealCategory === category)?._sum.calories ?? 0;
    return {
      mealCategory: category,
      calories,
      percentage: total === 0 ? 0 : Math.round((calories / total) * 1000) / 10
    };
  });
}

export async function getDashboardSummary(userId: string) {
  const todayStart = startOfDay(new Date());
  const todayEnd = new Date(todayStart);
  todayEnd.setHours(23, 59, 59, 999);
  const weekStart = startOfDay(new Date());
  weekStart.setDate(weekStart.getDate() - 6);

  const [today, week, totalFoodLogs, recentFoodEntries, mealDistribution] = await Promise.all([
    prisma.foodLog.aggregate({ where: { userId, isDeleted: false, consumedDateTime: { gte: todayStart, lte: todayEnd } }, _sum: { calories: true } }),
    prisma.foodLog.aggregate({ where: { userId, isDeleted: false, consumedDateTime: { gte: weekStart } }, _sum: { calories: true } }),
    prisma.foodLog.count({ where: { userId, isDeleted: false } }),
    prisma.foodLog.findMany({ where: { userId, isDeleted: false }, orderBy: { consumedDateTime: "desc" }, take: 5 }),
    getMealDistribution(userId)
  ]);

  const dinner = mealDistribution.find((item) => item.mealCategory === "DINNER");
  const insights = [
    `Dinner contributes ${dinner?.percentage ?? 0}% of your calorie intake`,
    `You logged ${totalFoodLogs} food entries`,
    week._sum.calories ? `You consumed ${week._sum.calories} calories in the last 7 days` : "Start logging to unlock weekly insights"
  ];

  return {
    todayCalories: today._sum.calories ?? 0,
    weeklyCalories: week._sum.calories ?? 0,
    totalFoodLogs,
    currentLoggingStreak: await getCurrentLoggingStreak(userId),
    recentFoodEntries,
    quickInsights: insights
  };
}

async function getCurrentLoggingStreak(userId: string) {
  const logs = await prisma.foodLog.findMany({
    where: { userId, isDeleted: false },
    select: { consumedDateTime: true },
    orderBy: { consumedDateTime: "desc" },
    take: 60
  });
  const loggedDays = new Set(logs.map((log) => toDateKey(log.consumedDateTime)));
  let streak = 0;
  const cursor = startOfDay(new Date());

  while (loggedDays.has(toDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
