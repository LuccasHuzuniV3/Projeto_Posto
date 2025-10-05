"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combustivelDeleteService = exports.combustivelUpdateService = exports.combustivelListOneService = exports.combustivelListService = exports.combustivelCreateService = void 0;
const index_1 = require("../index");
//Criar um combustivel
const combustivelCreateService = async (data) => {
    const { tipo } = data;
    if (!tipo) {
        throw new Error('Tipo é obrigatório');
    }
    const newCombustivel = await index_1.prisma.combustivel.create({
        data: {
            tipo: tipo.trim()
        }
    });
    return newCombustivel;
};
exports.combustivelCreateService = combustivelCreateService;
//Lista todos os combustiveis
const combustivelListService = async () => {
    return await index_1.prisma.combustivel.findMany();
};
exports.combustivelListService = combustivelListService;
//Busca um combustivel
const combustivelListOneService = async (id) => {
    return await index_1.prisma.combustivel.findUniqueOrThrow({
        where: {
            id
        }
    });
};
exports.combustivelListOneService = combustivelListOneService;
//Atualizando um combustivel
const combustivelUpdateService = async (id, data) => {
    return await index_1.prisma.combustivel.update({
        where: {
            id
        },
        data
    });
};
exports.combustivelUpdateService = combustivelUpdateService;
//Deletando um combustivel
const combustivelDeleteService = async (id) => {
    return await index_1.prisma.combustivel.delete({
        where: {
            id
        }
    });
};
exports.combustivelDeleteService = combustivelDeleteService;
//# sourceMappingURL=combustivel.service.js.map