/*
  Warnings:

  - You are about to drop the column `frete` on the `compra` table. All the data in the column will be lost.
  - You are about to drop the column `imposto` on the `compra` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."compra" DROP COLUMN "frete",
DROP COLUMN "imposto";
