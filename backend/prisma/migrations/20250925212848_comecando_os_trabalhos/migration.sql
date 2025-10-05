-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."fornecedor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "Status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "fornecedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."preco" (
    "id" SERIAL NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fornecedorId" INTEGER NOT NULL,
    "combustivelId" INTEGER NOT NULL,

    CONSTRAINT "preco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."combustivel" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "combustivel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."compra" (
    "id" SERIAL NOT NULL,
    "quantidade" DOUBLE PRECISION NOT NULL,
    "dataCompra" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "frete" DOUBLE PRECISION NOT NULL,
    "imposto" DOUBLE PRECISION NOT NULL,
    "custoTotal" DOUBLE PRECISION NOT NULL,
    "fornecedorId" INTEGER NOT NULL,

    CONSTRAINT "compra_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "fornecedor_cnpj_key" ON "public"."fornecedor"("cnpj");

-- AddForeignKey
ALTER TABLE "public"."preco" ADD CONSTRAINT "preco_combustivelId_fkey" FOREIGN KEY ("combustivelId") REFERENCES "public"."combustivel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."preco" ADD CONSTRAINT "preco_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "public"."fornecedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."compra" ADD CONSTRAINT "compra_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "public"."fornecedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
