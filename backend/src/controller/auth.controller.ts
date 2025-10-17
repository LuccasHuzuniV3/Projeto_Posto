import { Request, Response } from "express";
import { validateUserService, userCreateServiceNew } from "../services/auth.service"
import bcrypt from "bcryptjs";

 
export const loginController = async (req: Request, res: Response): Promise<void> => {

    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            res.status(400).json({ message: 'Email e senha são obrigatórios' });
            return;
        } 
        
        const usuario = await validateUserService(email);
        if (!usuario) {
            res.status(401).json({ message: 'Credenciais inválidas' });
            return;
        } 
        
        const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Credenciais inválidas' });
            return;
        }
            
        // 1. Você define o que vai para a sessão
        req.session.usuario = { 
            id: usuario.id, 
            role: usuario.role, 
            fornecedorId: usuario.fornecedorId
        };

        // 2. Você FORÇA o salvamento da sessão ANTES de responder.
        // Isso resolve o problema do Set-Cookie não ser enviado.
        req.session.save((err) => {
            if (err) {
                console.error("Erro ao salvar a sessão:", err);
                return res.status(500).json({ message: "Erro interno ao iniciar a sessão." });
            }

            // 3. AGORA que a sessão está salva, enviamos a resposta no formato que o front-end espera.
            // O front-end espera um objeto 'user' dentro da resposta.
            return res.status(200).json({ 
                message: "Login bem-sucedido!",
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    role: usuario.role
                }
            });
        });

    } catch(error) {
        res.status(500).json({ message: 'Erro interno' });
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