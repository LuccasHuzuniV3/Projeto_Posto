import { Request, Response } from "express";
import { dashboardCountFornecedorService,dashboardMelhoresPrecosService,dashboardUltimasComprasService,dashboardCustoTotalMesService } from "../services/dashboard.service";

//Dashboard contagem de fornecedores
export const dashboardCountFornecedorController = async ( req: Request, res: Response):Promise<Response> =>{

    try{
        const count = await dashboardCountFornecedorService();
        return res.status(200).json(count);
    }catch(error){
        return res.status(500).json({ message: 'Erro interno do servidor na busca do dashboard' });
    }
}

//Dashboard melhores preços por combustivel
export const dashboardMelhoresPrecosController = async(req:Request, res:Response):Promise<Response> =>{
    try{
        const mPrecos = await dashboardMelhoresPrecosService();
        return res.status(200).json(mPrecos)
    }catch(error){
        return res.status(500).json({message:'Erro ao buscar os melhores precos dashboard'});
    }
}

//Dashboard com ultimas compras realizadas
export const dashboardUltimasComprasController = async(req:Request, res:Response):Promise<Response> =>{
    try{
        const ultimasCompras = await dashboardUltimasComprasService();
        return res.status(200).json(ultimasCompras)
    }catch(error){
        return res.status(500).json({message:'Erro ao buscar as ultimas compras dashboard controller'});
    }   
}

//Dashboard para calcular as compras totais no mes
export const dashboardTotalComprasMesController = async(req:Request, res:Response):Promise<Response> =>{
    try{
        const totalComprasMes = await dashboardCustoTotalMesService();
        return res.status(200).json(totalComprasMes)
    }catch(error){
        return res.status(500).json({message:'Erro ao buscar o total de compras do mes no dashboard controller'});
    }   
}