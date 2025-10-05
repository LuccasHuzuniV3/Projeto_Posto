"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyDeleteService = exports.buyUpdateService = exports.buyListOneService = exports.buyListService = exports.buyCreateService = void 0;
const index_1 = require("../index");
//Cria uma nova compra
const buyCreateService = async (data) => {
    const { quantidade, precoId } = data;
    if (!quantidade || !precoId) {
        throw new Error('Todos os campos são obrigatórios');
    }
    //Verifica se o preco existe
    const precoExists = await index_1.prisma.preco.findUnique({
        where: {
            id: precoId
        }
    });
    if (!precoExists) {
        throw new Error('Preco nao encontrado');
    }
    const custoTotal = quantidade * precoExists.valor; //Calculando o total da compra
    const newBuy = await index_1.prisma.compra.create({
        data: {
            quantidade,
            custoTotal,
            precoId
        }
    });
    return newBuy;
};
exports.buyCreateService = buyCreateService;
//Lista as compras
const buyListService = async () => {
    return await index_1.prisma.compra.findMany();
};
exports.buyListService = buyListService;
//Acessa uma compra
const buyListOneService = async (id) => {
    return await index_1.prisma.compra.findUniqueOrThrow({
        where: {
            id
        }
    });
};
exports.buyListOneService = buyListOneService;
//Atualiza uma compra
const buyUpdateService = async (id, data) => {
    const buy = await index_1.prisma.compra.update({
        where: {
            id
        },
        data
    });
    return buy;
};
exports.buyUpdateService = buyUpdateService;
//Deleta uma compra
const buyDeleteService = async (id) => {
    const buy = await index_1.prisma.compra.delete({
        where: {
            id
        }
    });
    return buy;
};
exports.buyDeleteService = buyDeleteService;
//# sourceMappingURL=compras.service.js.map