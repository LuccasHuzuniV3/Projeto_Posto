import { prisma } from "../index";


interface DashboardCountFornecedorReturn{
    fornecedorCount: number
}

interface DashboardMelhoresPrecos{
    combustivel:string
    valor:number
    fornecedor:string
}

interface CustoTotalMesReturn {
    custoTotalMes: number;
}

//Contador de fornecedores ativos
export const dashboardCountFornecedorService = async():Promise<DashboardCountFornecedorReturn> => {
    const fornecedorCount = await prisma.fornecedor.count({
        where:{
            Status: true
        }
    });
    return {fornecedorCount};
}

//Melhores precos por combustivel
export const dashboardMelhoresPrecosService = async():Promise<DashboardMelhoresPrecos[]> => {

    let combustiveis = await prisma.combustivel.findMany()

   const melhoresPrecos: DashboardMelhoresPrecos[] = [];

    for (const combustivelAtual of combustiveis) {

        let preco = await prisma.preco.findFirst({
            where:{
                combustivelId:combustivelAtual.id
            },
            orderBy:{
                valor:'asc'
            },
            include:{
                fornecedor:{
                    select:{
                        nome:true
                    }
                }
            }
        })

        if(preco){
            melhoresPrecos.push({
                combustivel:combustivelAtual.tipo,
                valor:preco.valor,
                fornecedor:preco.fornecedor.nome
            })
        }
    }

    return melhoresPrecos;

}

//Ultimas compras realizadas
export const dashboardUltimasComprasService = async():Promise<any[]> => {
    const ultimasCompras = await prisma.compra.findMany({
        include:{
            preco:{
                include:{
                    fornecedor:true,
                    combustivel:true
                }
            }
        },
        orderBy:{
            dataCompra:'desc'
        },
        take:5
    })

    return ultimasCompras
} 

// No seu dashboard.service.ts

export const dashboardCustoTotalMesService = async (): Promise<CustoTotalMesReturn> => {
    
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);

    const agregacao = await prisma.compra.aggregate({
        _sum: {
            custoTotal: true,
        },
        where: {
            dataCompra: {
                gte: trintaDiasAtras,
            },
        },
    });

    const custoTotal = agregacao._sum.custoTotal || 0;

    return { custoTotalMes: custoTotal };
};