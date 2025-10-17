import { request } from "express";
import { prisma } from "../index";
import bcrypt from "bcryptjs";


export interface UserCreate{
    email:string
    senha:string
    nome:string
    fornecedorId:number | null
    role:string
}

export interface UserReturn extends UserCreate{
    id: number
}

export interface UserReturnCliente{
    email:string
    nome:string
    fornecedorId:number | null
    role:string
}

export interface UserUpdate{
    email?:string
    senha?:string
    nome?:string
    fornecedorId?:number
    role?:string
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


//Cria new User
export const userCreateServiceNew = async(data:UserCreate) => {

    const { nome, email, senha, fornecedorId, role } = data

    const register = await prisma.usuario.findUnique({
                where: { email }
    });
    
   // Se o usuário já existir, lança um erro
    if (register) {
        throw new Error('Email já registrado');
    }

    if (role === 'Fornecedor' && fornecedorId) {
        
        const fornecedorJaVinculado = await prisma.usuario.findUnique({
            where: { fornecedorId: fornecedorId }
        });

        if (fornecedorJaVinculado) {
            throw new Error('Este fornecedor já está vinculado a outro usuário.');
        }
    }
    
    //Criptograda a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    const newUser = await prisma.usuario.create({
                data: {
                    nome,
                    email,
                    senha: hashedPassword,
                    fornecedorId,
                    role                
                }
            });

    
    // Retorna o usuário sem a senha
    const { senha: _, ...UserReturnCliente } = newUser;
    return UserReturnCliente;
}

//Lista todos
export const userListService = async():Promise<UserReturnCliente[]> =>{
    const users = await prisma.usuario.findMany();

    return users.map(user => {
        const { senha: _, ...safeUser } = user;
        return safeUser;
    });

}

//Atualiza dados do usuario
export const userUpdateService = async(id:number,data:UserUpdate):Promise<UserReturnCliente> => {

    //Primeiro checo se existe mesmo o usuario
    const userExist = await prisma.usuario.findFirstOrThrow({
        where:{
            id:id
        }
    })

    if(!userExist){
        throw new Error("Usuario nao existe");
    }

    if (data.senha) {
        // ...nós a criptografamos ANTES de salvar.
        data.senha = await bcrypt.hash(data.senha, 10);
    }

    const user: UserReturn = await prisma.usuario.update({
        where:{
            id
        },
        data: data
    }); 

    const { senha: _, ...safeUser } = user;
    return safeUser;
}
    
//Apaga um User
export const userDeleteService = async(id:number):Promise<UserReturnCliente> => {

    const user: UserReturnCliente = await prisma.usuario.delete({
        where:{
            id
        }
    })
    return user
}

//Busca um 
export const userListOneService = async(id:number):Promise<UserReturnCliente> =>{

    const user = await prisma.usuario.findUnique({
        where:{
            id
        }
    })

    if(!user){
        throw new Error("Erro ao busca user")
    }

    const { senha: _, ...safeUser } = user;
    return safeUser;
}