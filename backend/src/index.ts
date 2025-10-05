// src/index.ts
import { app } from './app';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

export const prisma = new PrismaClient();

   
const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`App rodando na porta ${PORT}`);
});
