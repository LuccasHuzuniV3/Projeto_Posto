"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fornecedorDeleteService = exports.fornecedorInativaService = exports.fornecedorUpdateService = exports.fornecedorListOneService = exports.fornecedorListService = exports.fornecedorCreateService = void 0;
const index_1 = require("../index");
//Cria um novo fornecedor
const fornecedorCreateService = async (data) => {
    const { nome, cnpj, telefone, email, endereco } = data;
    const newFornecedor = await index_1.prisma.fornecedor.create({
        data: {
            nome,
            cnpj,
            telefone,
            email,
            endereco
        }
    });
    return newFornecedor;
};
exports.fornecedorCreateService = fornecedorCreateService;
//Lista todos
const fornecedorListService = async () => {
    return await index_1.prisma.fornecedor.findMany();
};
exports.fornecedorListService = fornecedorListService;
//Busca um fornecedor
const fornecedorListOneService = async (id) => {
    return await index_1.prisma.fornecedor.findUniqueOrThrow({
        where: {
            id
        }
    });
};
exports.fornecedorListOneService = fornecedorListOneService;
//Atualizando um fornecedor
const fornecedorUpdateService = async (id, data) => {
    const fornecedor = await index_1.prisma.fornecedor.update({
        where: {
            id
        },
        data
    });
    return fornecedor;
};
exports.fornecedorUpdateService = fornecedorUpdateService;
//Desativar registro
const fornecedorInativaService = async (id) => {
    const fornecedor = await index_1.prisma.fornecedor.update({
        where: {
            id
        },
        data: {
            Status: false //Deixo ele inativo '-'
        }
    });
    return fornecedor;
};
exports.fornecedorInativaService = fornecedorInativaService;
//Apagar um fornecedor
const fornecedorDeleteService = async (id) => {
    const fornecedor = await index_1.prisma.fornecedor.delete({
        where: {
            id
        }
    });
    return fornecedor;
};
exports.fornecedorDeleteService = fornecedorDeleteService;
//# sourceMappingURL=fornecedor.service.js.map