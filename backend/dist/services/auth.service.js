"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCreateServiceNew = exports.validateUserService = void 0;
const index_1 = require("../index");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validateUserService = async (email) => {
    const validade = await index_1.prisma.usuario.findUnique({
        where: { email }
    });
    if (!validade) {
        throw new Error('Usuário não encontrado');
    }
    return validade;
};
exports.validateUserService = validateUserService;
const userCreateServiceNew = async (email, senha, nome) => {
    const register = await index_1.prisma.usuario.findUnique({
        where: { email }
    });
    // Se o usuário já existir, lança um erro
    if (register) {
        throw new Error('Email já registrado');
    }
    //Criptograda a senha
    const hashedPassword = await bcryptjs_1.default.hash(senha, 10);
    const newUser = await index_1.prisma.usuario.create({
        data: {
            nome,
            email,
            senha: hashedPassword
        }
    });
    return newUser;
};
exports.userCreateServiceNew = userCreateServiceNew;
//# sourceMappingURL=auth.service.js.map