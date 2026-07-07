import { PrismaClient, MealCategory, PortionUnit } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const tagNames = [
  "Healthy",
  "High Protein",
  "Low Carb",
  "Weight Loss",
  "Cheat Meal",
  "Homemade",
  "Restaurant",
  "Post Workout"
];

const foods = [
  "Oatmeal",
  "Greek Yogurt",
  "Grilled Chicken Salad",
  "Dal Rice",
  "Paneer Bowl",
  "Fruit Smoothie",
  "Veg Sandwich",
  "Idli Sambar",
  "Eggs and Toast",
  "Quinoa Bowl"
];

async function main() {
  await prisma.foodLogTag.deleteMany();
  await prisma.foodLog.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();

  const tags = await Promise.all(tagNames.map((name) => prisma.tag.create({ data: { name } })));
  const passwordHash = await bcrypt.hash("Password123!", 12);

  const users = await Promise.all(
    Array.from({ length: 5 }).map((_, index) =>
      prisma.user.create({
        data: {
          name: `Sample User ${index + 1}`,
          email: `user${index + 1}@healthledger.local`,
          passwordHash
        }
      })
    )
  );

  const mealCategories = Object.values(MealCategory);
  const portionUnits = Object.values(PortionUnit);

  for (let index = 0; index < 50; index += 1) {
    const user = users[index % users.length];
    const consumedDateTime = new Date();
    consumedDateTime.setDate(consumedDateTime.getDate() - (index % 30));
    consumedDateTime.setHours(8 + (index % 12), 15, 0, 0);
    const selectedTags = [tags[index % tags.length], tags[(index + 3) % tags.length]];

    await prisma.foodLog.create({
      data: {
        userId: user.id,
        foodName: foods[index % foods.length],
        mealCategory: mealCategories[index % mealCategories.length],
        consumedDateTime,
        portionQuantity: 1 + (index % 3),
        portionUnit: portionUnits[index % portionUnits.length],
        calories: 180 + index * 12,
        notes: index % 2 === 0 ? "Seeded food log for analytics and search." : null,
        tags: {
          create: selectedTags.map((tag) => ({ tagId: tag.id }))
        }
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
