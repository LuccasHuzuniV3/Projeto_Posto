import { prisma } from "../index";
import bcrypt from "bcryptjs";


export interface UserCreate{
    email:string
    senha:string
    nome:string
}

export interface UserReturn extends UserCreate{
    id: number
}

export const validateUserService = async(email:string):Promise<UserReturn> => {
    const validade = await prisma.usuario.findUnique({
        where: { email }
    });

    if (!validade) {
        throw new Error('Usuário não encontrado');
    }

    return validade as UserReturn;
}


export const userCreateServiceNew = async(email:string,senha:string,nome:string) => {

    const register = await prisma.usuario.findUnique({
                where: { email }
    });
    
   // Se o usuário já existir, lança um erro
    if (register) {
        throw new Error('Email já registrado');
    }
    
    //Criptograda a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    const newUser = await prisma.usuario.create({
                data: {
                    nome,
                    email,
                    senha: hashedPassword
                }
            });
    return newUser
}

