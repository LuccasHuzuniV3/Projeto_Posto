"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDeleteController = exports.userUpdateController = exports.userListOne = exports.userListController = void 0;
const auth_service_1 = require("../services/auth.service");
/*
//Criar usuario
export const userCreateController = async(req:Request,res:Response):Promise<Response> => {

    try{
        const user = await userCreateServiceNew(req.body)
        return res.status(201).json(user)
    }catch(error){
        return res.status(400).json({message:"Erro ao criar"})
    }

}
*/
//Trazer todos os usuarios
const userListController = async (req, res) => {
    try {
        const user = await (0, auth_service_1.userListService)();
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(400).json({ message: "Erro ao listar" });
    }
};
exports.userListController = userListController;
//Busca um
const userListOne = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const user = await (0, auth_service_1.userListOneService)(id);
        return res.status(201).json(user);
    }
    catch (error) {
        return res.status(400).json({ message: "Erro ao buscar este usuario" });
    }
};
exports.userListOne = userListOne;
//Atualiza usuario
const userUpdateController = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const newUser = await (0, auth_service_1.userUpdateService)(id, req.body);
        return res.status(201).json(newUser);
    }
    catch (error) {
        return res.status(400).json({ message: "Erro ao atualizar" });
    }
};
exports.userUpdateController = userUpdateController;
//Delete um usuario
const userDeleteController = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const user = await (0, auth_service_1.userDeleteService)(id);
        return res.status(201).json({ message: "Excluido com sucesso!" });
    }
    catch (error) {
        return res.status(404).json({ message: "Erro ao exluir" });
    }
};
exports.userDeleteController = userDeleteController;
//# sourceMappingURL=user.controller.js.map