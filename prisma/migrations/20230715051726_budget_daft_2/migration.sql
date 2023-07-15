/*
  Warnings:

  - You are about to drop the column `amount` on the `Budget` table. All the data in the column will be lost.
  - Added the required column `common_amount` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `amount` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "amount",
ADD COLUMN     "common_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "others_amount" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "amount" SET NOT NULL,
ALTER COLUMN "amount" SET DEFAULT 0,
ALTER COLUMN "is_active" SET DEFAULT false;
