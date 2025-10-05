"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
// src/index.ts
const app_1 = require("./app");
const client_1 = require("@prisma/client");
require("dotenv/config");
exports.prisma = new client_1.PrismaClient();
const PORT = Number(process.env.PORT) || 5000;
app_1.app.listen(PORT, () => {
    console.log(`App rodando na porta ${PORT}`);
});
//# sourceMappingURL=index.js.map