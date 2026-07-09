-- CreateEnum
CREATE TYPE "MealCategory" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'MORNING_SNACK', 'EVENING_SNACK', 'LATE_NIGHT_SNACK');

-- CreateEnum
CREATE TYPE "PortionUnit" AS ENUM ('G', 'ML', 'PIECES', 'SERVINGS', 'BOWLS', 'CUPS');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_logs" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "food_name" TEXT NOT NULL,
    "meal_category" "MealCategory" NOT NULL,
    "consumed_date_time" TIMESTAMP(3) NOT NULL,
    "portion_quantity" DECIMAL(10,2) NOT NULL,
    "portion_unit" "PortionUnit" NOT NULL,
    "calories" INTEGER NOT NULL,
    "notes" TEXT,
    "food_image_url" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "food_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_log_tags" (
    "food_log_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,

    CONSTRAINT "food_log_tags_pkey" PRIMARY KEY ("food_log_id","tag_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "food_logs_user_id_consumed_date_time_idx" ON "food_logs"("user_id", "consumed_date_time");

-- CreateIndex
CREATE INDEX "food_logs_meal_category_idx" ON "food_logs"("meal_category");

-- CreateIndex
CREATE INDEX "food_logs_calories_idx" ON "food_logs"("calories");

-- CreateIndex
CREATE INDEX "food_logs_food_name_idx" ON "food_logs"("food_name");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE INDEX "tags_name_idx" ON "tags"("name");

-- AddForeignKey
ALTER TABLE "food_logs" ADD CONSTRAINT "food_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_log_tags" ADD CONSTRAINT "food_log_tags_food_log_id_fkey" FOREIGN KEY ("food_log_id") REFERENCES "food_logs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_log_tags" ADD CONSTRAINT "food_log_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
