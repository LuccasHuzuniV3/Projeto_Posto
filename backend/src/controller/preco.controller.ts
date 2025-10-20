import {Request, Response} from "express"
import { precoCreateService, PrecoCreate, PrecoReturn } from "../services/preco.service"
import { precoDeleteService, precoListOneService, precoListService, precoUpdateService,precoRecentService,precoComparativoService,precoHistoricoService } from "../services/preco.service"
import { FornecedorCreate } from "@services/fornecedor.service"

//Criar um preco
export const precoCreateController = async(req:Request,res:Response):Promise<Response> => {

    try{
        const newPreco: PrecoReturn = await precoCreateService(req.body)
        return res.status(201).json(newPreco)
    }catch(error){
        return res.status(500).json({ message: 'Erro interno' });
    }
}

//Lista todos os precos
export const precoListController = async(req:Request,res:Response):Promise<Response> => {

    try{
        const newPreco: PrecoReturn[] = await precoListService()
        return res.status(201).json(newPreco);
    }catch(error){
        return res.status(500).json({message: 'Erro ao listar os precos'})
    }
}

//Lista um preco
export const precoListOneController = async(req:Request, res:Response):Promise<Response> => {
    const id = Number(req.params.id);

    try{
        const newPreco: PrecoReturn = await precoListOneService(id);
        return res.status(201).json(newPreco);
    }catch(error){
        return res.status(500).json({message: 'Erro ao lista este preco'})
    }

}

//Atualiza um preco
export const precoUpdateController = async(req:Request,res:Response):Promise<Response> => {
    const id = Number(req.params.id);

    try{
        const newPreco: PrecoReturn = await precoUpdateService(id,req.body);
        return res.status(201).json(newPreco);
    }catch(error){
        return res.status(500).json({message: 'Erro ao listar este preco'})
    }

}

//Apaga um preco
export const precoDeleteController = async(req:Request, res:Response):Promise<Response> => {
    const id = Number(req.params.id);

    try{
        const newPreco: PrecoReturn = await precoDeleteService(id);
         return res.status(200).json({message: 'Apagado com sucesso'});
    }catch(error){
        return res.status(500).json({message: 'Erro ao apagar este preco '})
    }

}

//Pega o preco mais recente
export const precoRecentController = async(req:Request,res:Response):Promise<Response> => {
    
    const combustivelId = Number(req.query.combustivelId);
    const fornecedorId = Number(req.query.fornecedorId);

    try{
        const recentPreco: PrecoReturn = await precoRecentService({combustivelId,fornecedorId});
        return res.status(200).json(recentPreco);
    }catch(error:any){
        return res.status(404).json({message: 'Erro ao buscar o preco mais recente'})
    }
}

 

//ROTA EXCLUSIVA DO FORNECEDOR
export const precoFornecedorCreateController = async(req:Request,res:Response):Promise<Response> =>{

    try{
        const fornecedorId = req.session.usuario?.fornecedorId;

          if (!fornecedorId) {
            throw new Error("ID do fornecedor não encontrado na sessão.");
        }

        const { valor, combustivelId } = req.body;

         const precoData = {
            valor,
            combustivelId,
            fornecedorId 
        };

        const newPreco: PrecoReturn = await precoCreateService(precoData)
        
        return res.status(201).json(newPreco)
    }catch(error){
        return res.status(500).json({ message: 'Erro interno' });
    }

}


//Pega o comparativo de precos de um combustivel
export const precoComparativoController = async(req:Request,res:Response):Promise<Response> => {
    const idCombustivel = Number(req.params.idCombustivel);

    try{
        const comparativo = await precoComparativoService(idCombustivel);
        return res.status(200).json(comparativo);
    }catch(error){

        return res.status(500).json({message: 'Erro ao buscar o comparativo de precos'})
    }

}

//Historio de precos
export const precoHistoricoController = async(req:Request,res:Response):Promise<Response> => {

    try{ 
        const historico = await precoHistoricoService();
        return res.status(200).json(historico);
    }catch(error){
        return res.status(500).json({message: 'Erro ao buscar o historico de precos'})
    }   

}