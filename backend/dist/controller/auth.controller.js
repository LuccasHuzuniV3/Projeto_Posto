"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = exports.loginController = void 0;
const auth_service_1 = require("../services/auth.service");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const loginController = async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json({ message: 'email e senha são obrigatórios' });
        }
        const usuario = await (0, auth_service_1.validateUserService)(email);
        if (!usuario) {
            return res.status(401).json({ message: 'Credencias invalidas' });
        }
        const isPasswordValid = await bcryptjs_1.default.compare(senha, usuario.senha);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credencias invalidas' });
        }
        return res.json({ usuarioId: usuario.id, nome: usuario.nome });
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro interno' });
    }
};
exports.loginController = loginController;
const registerController = async (req, res) => {
    try {
        const { email, senha, nome } = req.body;
        const registro = await (0, auth_service_1.userCreateServiceNew)(email, senha, nome);
        if (!registro) {
            return res.status(500).json({ message: "Erro ao cadastrar usuario" });
        }
        return res.status(200).json({ message: "Cadastro com sucesso!" });
    }
    catch (error) {
        if (error instanceof Error) {
            // Se for um erro de duplicidade de email
            if (error.message === 'Email já registrado') {
                return res.status(400).json({ message: error.message }); // 400: Bad Request
            }
            // Caso seja outro tipo de erro, retornamos um erro genérico
            return res.status(500).json({ message: 'Erro interno no servidor' });
        }
        return res.status(500).json({ message: 'Erro interno' });
    }
};
exports.registerController = registerController;
//# sourceMappingURL=auth.controller.js.map