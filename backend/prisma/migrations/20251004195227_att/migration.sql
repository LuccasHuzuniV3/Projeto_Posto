/*
  Warnings:

  - You are about to drop the column `fornecedorId` on the `compra` table. All the data in the column will be lost.
  - Added the required column `precoId` to the `compra` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."compra" DROP CONSTRAINT "compra_fornecedorId_fkey";

-- AlterTable
ALTER TABLE "public"."compra" DROP COLUMN "fornecedorId",
ADD COLUMN     "precoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."compra" ADD CONSTRAINT "compra_precoId_fkey" FOREIGN KEY ("precoId") REFERENCES "public"."preco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
