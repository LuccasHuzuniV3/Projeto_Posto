import { Request,Response} from "express";
import { userCreateServiceNew,UserReturnCliente,userListService,userUpdateService,userDeleteService,userListOneService} from "../services/auth.service";


//Trazer todos os usuarios
export const userListController = async(req:Request,res:Response):Promise<Response> =>{

    try{
        const user: UserReturnCliente[] = await userListService();
        return res.status(200).json(user)
    }catch(error){
        return res.status(400).json({message:"Erro ao listar"})
    }
}

//Busca um
export const userListOne = async(req:Request,res:Response):Promise<Response> => {
    const id = Number(req.params.id)

    try{
        const user: UserReturnCliente = await userListOneService(id)
        return res.status(201).json(user)
    }catch(error){
        return res.status(400).json({message:"Erro ao buscar este usuario"})
    }
    
}

//Atualiza usuario
export const userUpdateController = async(req:Request,res:Response):Promise<Response> =>{
    const id  = Number(req.params.id)

    try{
        const newUser: UserReturnCliente = await userUpdateService(id,req.body);
        return res.status(201).json(newUser);
    }catch(error){
        return res.status(400).json({message:"Erro ao atualizar"})
    }

}

//Delete um usuario
export const userDeleteController = async(req:Request,res:Response):Promise<Response> =>{
    const id = Number(req.params.id)

    try{
        const user: UserReturnCliente = await userDeleteService(id)
        return res.status(201).json({message:"Excluido com sucesso!"})
    }catch(error){
        return res.status(404).json({message:"Erro ao exluir"})
    }

}

export const userCreateController = async(req:Request, res:Response):Promise<Response> => {
    try {
        const user = await userCreateServiceNew(req.body);
        return res.status(201).json(user);
    } catch(error: any) {
        return res.status(400).json({ message: error.message || "Erro ao criar usuário" });
    }
}