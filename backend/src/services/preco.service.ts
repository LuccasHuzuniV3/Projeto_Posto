import { prisma } from "../index";

//Quando criar o produto devo retornar oq?
export interface PrecoCreate{
  valor: number
  fornecedorId:number
  combustivelId:number
}

//Quando busco o produto preciso saber o id tambem
export interface PrecoReturn extends PrecoCreate{
  id:number
}

//Quando atualizar o produto posso atualizar tudo menos o id
export interface PrecoUpdate{
  valor: number
  dataCadastro?: Date
  fornecedorId:number
  combustivelId:number
}

export interface PrecoRecent{
  fornecedorId:number
  combustivelId:number
}


//Criar um preco
export const precoCreateService = async(data:PrecoCreate):Promise<PrecoReturn> => {
    const {valor,fornecedorId,combustivelId} = data;

    const fornecedorExists = await prisma.fornecedor.findUnique({
        where:{
            id: fornecedorId
        }
    })

    if(!fornecedorExists){
         throw new Error('fornecedor nao encontrado');
    }

    const combustivelExist = await prisma.combustivel.findUnique({
        where:{
            id:combustivelId
        }
    })

    if(!combustivelExist){
        throw new Error('Combustivel invalido!')
    }

    const newPreco: PrecoReturn = await prisma.preco.create({
        data:{
            valor,
            fornecedorId,
            combustivelId
        }
    })

    return newPreco
}

//Lista todos os precos
export const precoListService = async():Promise<PrecoReturn[]> => {
    return await prisma.preco.findMany()
}

//Busca um preco
export const precoListOneService = async(id:number):Promise<PrecoReturn> => {
    return await prisma.preco.findUniqueOrThrow({
        where:{
            id
        }
    })
}

//Atualizando um preco
export const precoUpdateService = async(id:number,data:PrecoUpdate):Promise<PrecoReturn> => {

    //Validacoes    
    const precoExist = await prisma.preco.findUnique({
        where:{
            id:id
        }
    })

    if(!precoExist){
        throw new Error("Nao existe")
    }

    //Se mandou atualizar o fornecedor, verificar se existe
    if(data.fornecedorId){
        const fornecedorExists = await prisma.fornecedor.findUnique({
            where:{
                id: data.fornecedorId
            }
        })

        if(!fornecedorExists){
            throw new Error('fornecedor nao encontrado');
        }
    }

    //Se mandou atualizar o combustivel, verificar se existe
    if(data.combustivelId){
        const combustivelExist = await prisma.combustivel.findUnique({
            where:{
                id:data.combustivelId
            }
        })

        if(!combustivelExist){
            throw new Error('Combustivel invalido!')
        }
    }


    //Atualizando os dados
    const preco: PrecoReturn = await prisma.preco.update({
        where:{ 
            id
        },
        data
    })
    return preco
}

//Deletando um preco
export const precoDeleteService = async(id:number):Promise<PrecoReturn> => {
    const preco: PrecoReturn = await prisma.preco.delete({
        where:{
            id
        }
    })
    return preco
}


//Pegando o preco mais RECENTE
export const precoRecentService = async(data:PrecoRecent):Promise<PrecoReturn> => {

    const {fornecedorId,combustivelId} = data;

    const preco: PrecoReturn = await prisma.preco.findFirstOrThrow({
        where:{
            combustivelId,
            fornecedorId
        },
        orderBy:{
            dataCadastro:'desc'
        }
    })
    return preco
}

//Pegando o comparativo de precos de um combustivel
export const precoComparativoService = async(idCombustivel:number):Promise<any[]> => {

    //Pegos os fornecedores ativos
    let fornecedores = await prisma.fornecedor.findMany({
        where:{
            Status:true
        }
    })

    const melhoresPrecosPorFornecedor = []

    //Para cada fornecedo pego o preco mais recente do combustivel 
    for(const fornecedorAtual of fornecedores){

        let precoRecente = await prisma.preco.findFirst({
            where:{
                fornecedorId:fornecedorAtual.id,
                combustivelId:idCombustivel
            },
         orderBy:{
                dataCadastro: 'desc'
            },
        })

        if(precoRecente){
            melhoresPrecosPorFornecedor.push({
                fornecedor:fornecedorAtual.nome,
                valor:precoRecente.valor,
                dataAtualizacao:precoRecente.dataCadastro
            })
        }

    }

    return melhoresPrecosPorFornecedor

}

//Historico de precos
export const precoHistoricoService = async():Promise<any[]> => {
    const historico = await prisma.preco.findMany({
        include:{
            fornecedor:true,
            combustivel:true
            },
        orderBy:{
            dataCadastro:"desc"
        } 
    });
    
    return historico
}
