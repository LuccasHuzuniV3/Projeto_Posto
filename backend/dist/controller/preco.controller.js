"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.precoRecentController = exports.precoDeleteController = exports.precoUpdateController = exports.precoListOneController = exports.precoListController = exports.precoCreateController = void 0;
const preco_service_1 = require("../services/preco.service");
const preco_service_2 = require("../services/preco.service");
//Criar um preco
const precoCreateController = async (req, res) => {
    try {
        const newPreco = await (0, preco_service_1.precoCreateService)(req.body);
        return res.status(201).json(newPreco);
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro interno' });
    }
};
exports.precoCreateController = precoCreateController;
//Lista todos os precos
const precoListController = async (req, res) => {
    try {
        const newPreco = await (0, preco_service_2.precoListService)();
        return res.status(201).json(newPreco);
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro ao listar os precos' });
    }
};
exports.precoListController = precoListController;
//Lista um preco
const precoListOneController = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const newPreco = await (0, preco_service_2.precoListOneService)(id);
        return res.status(201).json(newPreco);
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro ao lista este preco' });
    }
};
exports.precoListOneController = precoListOneController;
//Atualiza um preco
const precoUpdateController = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const newPreco = await (0, preco_service_2.precoUpdateService)(id, req.body);
        return res.status(201).json(newPreco);
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro ao listar este preco' });
    }
};
exports.precoUpdateController = precoUpdateController;
//Apaga um preco
const precoDeleteController = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const newPreco = await (0, preco_service_2.precoDeleteService)(id);
        return res.status(200).json({ message: 'Apagado com sucesso' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro ao apagar este preco ' });
    }
};
exports.precoDeleteController = precoDeleteController;
//Pega o preco mais recente
const precoRecentController = async (req, res) => {
    console.log("Query recebida:", req.query);
    const combustivelId = Number(req.query.combustivelId);
    const fornecedorId = Number(req.query.fornecedorId);
    try {
        console.log("Chamando o service 'precoRecentService'...");
        const recentPreco = await (0, preco_service_2.precoRecentService)({ combustivelId, fornecedorId });
        return res.status(200).json(recentPreco);
    }
    catch (error) {
        console.error("!!! ERRO CAPTURADO NO CONTROLLER !!!", error);
        return res.status(404).json({ message: 'Erro ao buscar o preco mais recente' });
    }
};
exports.precoRecentController = precoRecentController;
//# sourceMappingURL=preco.controller.js.map