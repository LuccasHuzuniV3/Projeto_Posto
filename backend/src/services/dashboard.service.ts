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
export const dashboardMelhoresPrecosService = async (): Promise<DashboardMelhoresPrecos[]> => {

    const combustiveis = await prisma.combustivel.findMany();
    const melhoresPrecos: DashboardMelhoresPrecos[] = [];

    for (const combustivel of combustiveis) {
        
        // 1. Buscamos TODOS os preços deste combustível, ordenados do MAIS RECENTE para o antigo
        const historicoPrecos = await prisma.preco.findMany({
            where: {
                combustivelId: combustivel.id
            },
            orderBy: {
                dataCadastro: 'desc'
            },
            include: {
                fornecedor: {
                    select: { nome: true }
                }
            }
        });
        const precosAtuais = new Map();
        for (const p of historicoPrecos) {
            if (!precosAtuais.has(p.fornecedorId)) {
                precosAtuais.set(p.fornecedorId, p);
            }
        }

        let melhorPrecoAtual = null;

        for (const p of precosAtuais.values()) {
            if (!melhorPrecoAtual || p.valor < melhorPrecoAtual.valor) {
                melhorPrecoAtual = p;
            }
        }
        
        if (melhorPrecoAtual) {
            melhoresPrecos.push({
                combustivel: combustivel.tipo,
                valor: melhorPrecoAtual.valor,
                fornecedor: melhorPrecoAtual.fornecedor.nome
            });
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