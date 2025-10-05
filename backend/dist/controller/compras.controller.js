"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyDeleteController = exports.buyUpdateController = exports.comprasListOneController = exports.comprasListController = exports.comprasCreateController = void 0;
const compras_service_1 = require("../services/compras.service");
//Grava um novo compras
const comprasCreateController = async (req, res) => {
    try {
        const newBuy = await (0, compras_service_1.buyCreateService)(req.body);
        return res.status(201).json(newBuy);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.comprasCreateController = comprasCreateController;
//Lista todos os compras
const comprasListController = async (req, res) => {
    try {
        const newBuy = await (0, compras_service_1.buyListService)();
        return res.status(200).json(newBuy);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.comprasListController = comprasListController;
//Pega uma compra 
const comprasListOneController = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const newBuy = await (0, compras_service_1.buyListOneService)(id);
        return res.status(200).json(newBuy);
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
};
exports.comprasListOneController = comprasListOneController;
//Atualiza uma compra
const buyUpdateController = async (req, res) => {
    //Pego o id da requisição
    const id = Number(req.params.id);
    try {
        const newBuy = await (0, compras_service_1.buyUpdateService)(id, req.body);
        return res.status(200).json(newBuy);
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
};
exports.buyUpdateController = buyUpdateController;
//Apaga uma compra
const buyDeleteController = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const newBuy = await (0, compras_service_1.buyDeleteService)(id);
        return res.status(204).json({ message: 'Compra apagado com sucesso' });
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
};
exports.buyDeleteController = buyDeleteController;
//# sourceMappingURL=compras.controller.js.map