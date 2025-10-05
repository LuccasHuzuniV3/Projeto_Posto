"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fornecedorDeleteController = exports.fornecedorInativaController = exports.fornecedorUpdateController = exports.fornecedorListOneController = exports.fornecedorListController = exports.fornecedorCreateController = void 0;
const fornecedor_service_1 = require("../services/fornecedor.service");
//Grava um novo fornecedor
const fornecedorCreateController = async (req, res) => {
    try {
        const newFornecedor = await (0, fornecedor_service_1.fornecedorCreateService)(req.body);
        return res.status(201).json(newFornecedor);
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro interno' });
    }
};
exports.fornecedorCreateController = fornecedorCreateController;
//Lista todos os fornecedores
const fornecedorListController = async (req, res) => {
    try {
        const fornecedores = await (0, fornecedor_service_1.fornecedorListService)();
        return res.status(200).json(fornecedores);
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro interno' });
    }
};
exports.fornecedorListController = fornecedorListController;
//Pega um fornecedor
const fornecedorListOneController = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const fornecedor = await (0, fornecedor_service_1.fornecedorListOneService)(id);
        if (!fornecedor) {
            return res.status(404).json({ message: 'Fornecedor não encontrado' });
        }
        return res.status(200).json(fornecedor);
    }
    catch (error) {
        return res.status(404).json({ message: 'Fornecedor não encontrado' });
    }
};
exports.fornecedorListOneController = fornecedorListOneController;
//Atualiza um fornecedor
const fornecedorUpdateController = async (req, res) => {
    //Pego o id da requisição
    const id = Number(req.params.id);
    try {
        const fornecedor = await (0, fornecedor_service_1.fornecedorUpdateService)(id, req.body);
        return res.status(200).json(fornecedor);
    }
    catch (error) {
        return res.status(404).json({ message: 'Fornecedor não encontrado' });
    }
};
exports.fornecedorUpdateController = fornecedorUpdateController;
//Inativa um fornecedor
const fornecedorInativaController = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const fornecedor = await (0, fornecedor_service_1.fornecedorInativaService)(id);
        return res.status(200).json(fornecedor);
    }
    catch (error) {
        return res.status(404).json({ message: 'Fornecedor não encontrado' });
    }
};
exports.fornecedorInativaController = fornecedorInativaController;
//Apaga o fornecedor
const fornecedorDeleteController = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const fornecedor = await (0, fornecedor_service_1.fornecedorDeleteService)(id);
        return res.status(204).json({ message: 'Fornecedor apagado com sucesso' });
    }
    catch (error) {
        return res.status(404).json({ message: 'Fornecedor não encontrado' });
    }
};
exports.fornecedorDeleteController = fornecedorDeleteController;
//# sourceMappingURL=fornecedor.controller.js.map