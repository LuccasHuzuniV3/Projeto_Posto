"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combustivelDeleteController = exports.combustivelUpdateController = exports.combustivelListOneController = exports.combustivelListController = exports.combustivelCreateController = void 0;
const combustivel_service_1 = require("../services/combustivel.service");
//Criando um combustivel
const combustivelCreateController = async (req, res) => {
    try {
        const newCombustivel = await (0, combustivel_service_1.combustivelCreateService)(req.body);
        return res.status(201).json(newCombustivel);
    }
    catch (error) {
        return res.status(400).json({ message: 'Erro ao criar' });
    }
};
exports.combustivelCreateController = combustivelCreateController;
//Listando todos os combustiveis
const combustivelListController = async (req, res) => {
    try {
        const combustiveis = await (0, combustivel_service_1.combustivelListService)();
        return res.status(200).json(combustiveis);
    }
    catch (error) {
        return res.status(400).json({ message: 'Erro ao listar' });
    }
};
exports.combustivelListController = combustivelListController;
//Listando um combustivel
const combustivelListOneController = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const combustivel = await (0, combustivel_service_1.combustivelListOneService)(id);
        if (!combustivel) {
            return res.status(404).json({ message: 'Combustivel não encontrado' });
        }
        return res.status(200).json(combustivel);
    }
    catch (error) {
        return res.status(400).json({ message: 'Erro ao listar' });
    }
};
exports.combustivelListOneController = combustivelListOneController;
//Atualizando um combustivel
const combustivelUpdateController = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const updatedCombustivel = await (0, combustivel_service_1.combustivelUpdateService)(id, req.body);
        return res.status(200).json(updatedCombustivel);
    }
    catch (error) {
        return res.status(400).json({ message: 'Erro ao atualizar' });
    }
};
exports.combustivelUpdateController = combustivelUpdateController;
//Deletando um combustivel
const combustivelDeleteController = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const deletedCombustivel = await (0, combustivel_service_1.combustivelDeleteService)(id);
        return res.status(204).json({ message: 'Compra apagado com sucesso' });
    }
    catch (error) {
        return res.status(400).json({ message: 'Erro ao deletar' });
    }
};
exports.combustivelDeleteController = combustivelDeleteController;
//# sourceMappingURL=combustivel.controller.js.map