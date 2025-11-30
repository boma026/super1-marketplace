/*
  Warnings:

  - Added the required column `weekday` to the `Availability` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Weekday" AS ENUM ('Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo');

-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "weekday",
ADD COLUMN     "weekday" "Weekday" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Availability_providerId_weekday_key" ON "Availability"("providerId", "weekday");
