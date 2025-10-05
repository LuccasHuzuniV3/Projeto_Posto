"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.precoRecentService = exports.precoDeleteService = exports.precoUpdateService = exports.precoListOneService = exports.precoListService = exports.precoCreateService = void 0;
const index_1 = require("../index");
//Criar um preco
const precoCreateService = async (data) => {
    const { valor, fornecedorId, combustivelId } = data;
    const fornecedorExists = await index_1.prisma.fornecedor.findUnique({
        where: {
            id: fornecedorId
        }
    });
    if (!fornecedorExists) {
        throw new Error('fornecedor nao encontrado');
    }
    const combustivelExist = await index_1.prisma.combustivel.findUnique({
        where: {
            id: combustivelId
        }
    });
    if (!combustivelExist) {
        throw new Error('Combustivel invalido!');
    }
    const newPreco = await index_1.prisma.preco.create({
        data: {
            valor,
            fornecedorId,
            combustivelId
        }
    });
    return newPreco;
};
exports.precoCreateService = precoCreateService;
//Lista todos os precos
const precoListService = async () => {
    return await index_1.prisma.preco.findMany();
};
exports.precoListService = precoListService;
//Busca um preco
const precoListOneService = async (id) => {
    return await index_1.prisma.preco.findUniqueOrThrow({
        where: {
            id
        }
    });
};
exports.precoListOneService = precoListOneService;
//Atualizando um preco
const precoUpdateService = async (id, data) => {
    //Validacoes    
    const precoExist = await index_1.prisma.preco.findUnique({
        where: {
            id: id
        }
    });
    if (!precoExist) {
        throw new Error("Nao existe");
    }
    //Se mandou atualizar o fornecedor, verificar se existe
    if (data.fornecedorId) {
        const fornecedorExists = await index_1.prisma.fornecedor.findUnique({
            where: {
                id: data.fornecedorId
            }
        });
        if (!fornecedorExists) {
            throw new Error('fornecedor nao encontrado');
        }
    }
    //Se mandou atualizar o combustivel, verificar se existe
    if (data.combustivelId) {
        const combustivelExist = await index_1.prisma.combustivel.findUnique({
            where: {
                id: data.combustivelId
            }
        });
        if (!combustivelExist) {
            throw new Error('Combustivel invalido!');
        }
    }
    //Atualizando os dados
    const preco = await index_1.prisma.preco.update({
        where: {
            id
        },
        data
    });
    return preco;
};
exports.precoUpdateService = precoUpdateService;
//Deletando um preco
const precoDeleteService = async (id) => {
    const preco = await index_1.prisma.preco.delete({
        where: {
            id
        }
    });
    return preco;
};
exports.precoDeleteService = precoDeleteService;
//Pegando o preco mais RECENTE
const precoRecentService = async (data) => {
    const { fornecedorId, combustivelId } = data;
    const preco = await index_1.prisma.preco.findFirstOrThrow({
        where: {
            combustivelId,
            fornecedorId
        },
        orderBy: {
            dataCadastro: 'desc'
        }
    });
    return preco;
};
exports.precoRecentService = precoRecentService;
//# sourceMappingURL=preco.service.js.map