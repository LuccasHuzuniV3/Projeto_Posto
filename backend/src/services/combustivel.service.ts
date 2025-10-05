import { prisma } from "../index";


export interface CombustivelCreate{
    tipo: string
}

export interface CombustivelReturn extends CombustivelCreate{
    id:number
}

export interface CombustivelUpdate{
    tipo: string
}   

//Criar um combustivel
export const combustivelCreateService = async(data:CombustivelCreate):Promise<CombustivelReturn> => {

    const {tipo} = data
    if(!tipo){
        throw new Error('Tipo é obrigatório')
    }

    const newCombustivel: CombustivelReturn = await prisma.combustivel.create({
        data:{
            tipo:tipo.trim()
        }
    })
    return newCombustivel
}

//Lista todos os combustiveis
export const combustivelListService = async():Promise<CombustivelReturn[]> => {
    return await prisma.combustivel.findMany()
}

//Busca um combustivel
export const combustivelListOneService = async(id:number):Promise<CombustivelReturn> => {
    return await prisma.combustivel.findUniqueOrThrow({
        where:{
            id
        }
    })
}

//Atualizando um combustivel
export const combustivelUpdateService = async(id:number,data:CombustivelUpdate):Promise<CombustivelReturn> => {
    return await prisma.combustivel.update({
        where:{
            id
        },
        data
    })
}

//Deletando um combustivel
export const combustivelDeleteService = async(id:number):Promise<CombustivelReturn> => {
    return await prisma.combustivel.delete({
        where:{
            id
        }
    })
}
