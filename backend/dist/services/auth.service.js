"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userListOneService = exports.userDeleteService = exports.userUpdateService = exports.userListService = exports.userCreateServiceNew = exports.validateUserService = void 0;
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
//Cria new User
const userCreateServiceNew = async (data) => {
    const { nome, email, senha, fornecedorId, role } = data;
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
            senha: hashedPassword,
            fornecedorId,
            role
        }
    });
    const returnNewUser = {
        nome: newUser.nome,
        email: newUser.email,
        fornecedorId: newUser.fornecedorId,
        role: newUser.role
    };
    return returnNewUser;
};
exports.userCreateServiceNew = userCreateServiceNew;
//Lista todos
const userListService = async () => {
    return await index_1.prisma.usuario.findMany();
};
exports.userListService = userListService;
//Atualiza dados do usuario
const userUpdateService = async (id, data) => {
    //Primeiro checo se existe mesmo o usuario
    const userExist = await index_1.prisma.usuario.findFirstOrThrow({
        where: {
            id: id
        }
    });
    if (!userExist) {
        throw new Error("Usuario nao existe");
    }
    const user = await index_1.prisma.usuario.update({
        where: {
            id
        },
        data
    });
    return user;
};
exports.userUpdateService = userUpdateService;
//Apaga um User
const userDeleteService = async (id) => {
    const user = await index_1.prisma.usuario.delete({
        where: {
            id
        }
    });
    return user;
};
exports.userDeleteService = userDeleteService;
//Busca um 
const userListOneService = async (id) => {
    const user = await index_1.prisma.usuario.findUnique({
        where: {
            id
        }
    });
    if (!user) {
        throw new Error("Erro ao busca user");
    }
    return user;
};
exports.userListOneService = userListOneService;
//# sourceMappingURL=auth.service.js.map