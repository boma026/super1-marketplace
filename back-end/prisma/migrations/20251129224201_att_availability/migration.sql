/*
  Warnings:

  - A unique constraint covering the columns `[providerId,weekday]` on the table `Availability` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Availability" ADD COLUMN     "slots" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Availability_providerId_weekday_key" ON "Availability"("providerId", "weekday");
