import { Request, Response } from "express";
import { validateUserService, userCreateServiceNew } from "../services/auth.service"
import bcrypt from "bcryptjs";

 
export const loginController = async (req: Request, res: Response):Promise<Response> => {

    try{
        const { email , senha} = req.body;
        if (!email || !senha){
            return res.status(400).json({ message: 'email e senha são obrigatórios' });
        } 
        const usuario = await validateUserService(email);

        if (!usuario){
            return res.status(401).json({ message: 'Credencias invalidas' });
        } 
        
        const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Credencias invalidas' });
            }

        return res.json({ usuarioId: usuario.id, nome: usuario.nome });

    }catch(error){

        return res.status(500).json({ message: 'Erro interno' });
    }

}


export const registerController = async(req:Request, res:Response):Promise<Response> =>{

    try{
        const registro = await userCreateServiceNew(req.body)

        if (!registro){
            return res.status(500).json({message: "Erro ao cadastrar usuario"})
        }

        return res.status(200).json({message: "Cadastro com sucesso!"})

    }catch(error){

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

}