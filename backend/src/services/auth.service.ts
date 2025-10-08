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
    email:string
    senha:string
    nome:string
    fornecedorId:number
    role:string
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

    
    const returnNewUser = {
        nome:newUser.nome,
        email:newUser.email,
        fornecedorId:newUser.fornecedorId,
        role:newUser.role
    };


    return returnNewUser
}

//Lista todos
export const userListService = async():Promise<UserReturnCliente[]> =>{
    return await prisma.usuario.findMany()
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
    
    const user: UserReturn = await prisma.usuario.update({
        where:{
            id
        },
        data
    }); 

    return user
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

    return user
}