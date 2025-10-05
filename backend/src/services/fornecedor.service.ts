import { prisma } from "../index";


export interface FornecedorCreate{
    nome:string
    cnpj:string
    telefone:string
    email:string
    endereco:string
    Status:boolean
}

export interface FornecedorReturn extends FornecedorCreate{
    id: number
}


export interface FornecedorUpdate{
    nome:string
    cnpj:string
    telefone:string
    email:string
    endereco:string
    Status:boolean
}

//Cria um novo fornecedor
export const fornecedorCreateService = async(data:FornecedorCreate):Promise<FornecedorReturn> => {

    const {nome,cnpj,telefone,email,endereco} = data

    const newFornecedor: FornecedorReturn = await prisma.fornecedor.create({
        data:{
            nome,
            cnpj,
            telefone,
            email,
            endereco
        }
    });

    return newFornecedor
}

//Lista todos
export const fornecedorListService = async():Promise<FornecedorReturn[]> => {
    return await prisma.fornecedor.findMany()
}

//Busca um fornecedor
export const fornecedorListOneService = async(id:number):Promise<FornecedorReturn> => {
    return await prisma.fornecedor.findUniqueOrThrow({
        where:{
            id
        }
    })
}

//Atualizando um fornecedor
export const fornecedorUpdateService = async(id:number,data:FornecedorUpdate):Promise<FornecedorReturn> => {
    const fornecedor: FornecedorReturn = await prisma.fornecedor.update({
        where:{
            id
        },
        data
    })
    return fornecedor
}

//Desativar registro
export const fornecedorInativaService = async(id:number):Promise<FornecedorReturn> => {
    const fornecedor: FornecedorReturn = await prisma.fornecedor.update({
        where:{
            id
        },
        data:{
            Status:false //Deixo ele inativo '-'
        }
    })
    return fornecedor
}

//Apagar um fornecedor
export const fornecedorDeleteService = async(id:number):Promise<FornecedorReturn> => {
    const fornecedor: FornecedorReturn = await prisma.fornecedor.delete({
        where:{
            id
        }
    })
    return fornecedor
}   