/*
  Warnings:

  - A unique constraint covering the columns `[fornecedorId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "fornecedorId" INTEGER,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'Admin';

-- CreateIndex
CREATE UNIQUE INDEX "user_fornecedorId_key" ON "public"."user"("fornecedorId");

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "public"."fornecedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
