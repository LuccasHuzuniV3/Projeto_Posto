import { prisma } from "../index";


export interface BuyCreate{
    quantidade:number
    dataCompra:Date
    custoTotal:number
    precoId:number
}

export interface BuyReturn extends BuyCreate{
    id: number
}


export interface BuyUpdate{
    quantidade:number
    dataCompra:Date
    custoTotal:number
    precoId:number
}

//Cria uma nova compra
export const buyCreateService = async(data:BuyCreate):Promise<BuyReturn> =>{

    const {quantidade,precoId} = data;

    if(!quantidade || !precoId){
        throw new Error('Todos os campos são obrigatórios');
    }

    //Verifica se o preco existe
    const precoExists = await prisma.preco.findUnique({
        where:{
            id: precoId
        }
    })
    if(!precoExists){
        throw new Error('Preco nao encontrado');
    }

    const custoTotal = quantidade * precoExists.valor; //Calculando o total da compra

    const newBuy:BuyReturn = await prisma.compra.create({
        data:{
            quantidade,
            custoTotal,
            precoId
        }
    });

    return newBuy
}

//Lista as compras
export const buyListService = async():Promise<BuyReturn[]> => {
    return await prisma.compra.findMany()
}

//Acessa uma compra
export const buyListOneService = async(id:number):Promise<BuyReturn> => {
    return await prisma.compra.findUniqueOrThrow({
        where:{
            id
        }
    })
}

//Atualiza uma compra
export const buyUpdateService = async(id:number,data:BuyUpdate):Promise<BuyReturn> => {
    const buy: BuyReturn = await prisma.compra.update({
        where:{
            id
        },
        data
    }); 
    return buy
}

//Deleta uma compra
export const buyDeleteService = async(id:number):Promise<BuyReturn> => {
    const buy: BuyReturn = await prisma.compra.delete({
        where:{
            id
        }
    }); 
    return buy
}

