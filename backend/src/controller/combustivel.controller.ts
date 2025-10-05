import {Request, Response} from 'express'
import { combustivelListService,combustivelCreateService,combustivelDeleteService,combustivelListOneService,combustivelUpdateService, CombustivelReturn } from '../services/combustivel.service'  


//Criando um combustivel
export const combustivelCreateController = async(req:Request,res:Response):Promise<Response> => {
    try{    
        const newCombustivel:CombustivelReturn = await combustivelCreateService(req.body)
        return res.status(201).json(newCombustivel)
    }
    catch(error){
        return res.status(400).json({message:'Erro ao criar'})
    }
}

//Listando todos os combustiveis
export const combustivelListController = async(req:Request,res:Response):Promise<Response> => {
    try{
        const combustiveis:CombustivelReturn[] = await combustivelListService()
        return res.status(200).json(combustiveis)
    }catch(error){
        return res.status(400).json({message:'Erro ao listar'})
    }
}

//Listando um combustivel
export const combustivelListOneController = async(req:Request,res:Response):Promise<Response> => {

    const id = Number(req.params.id)
    try{

        const combustivel:CombustivelReturn | null = await combustivelListOneService(id)

        if(!combustivel){
            return res.status(404).json({message:'Combustivel não encontrado'})
        }

        return res.status(200).json(combustivel)
    }catch(error){
        return res.status(400).json({message:'Erro ao listar'})
    }
}

//Atualizando um combustivel
export const combustivelUpdateController = async(req:Request,res:Response):Promise<Response> => {
    const id = Number(req.params.id)
    try{
        const updatedCombustivel:CombustivelReturn = await combustivelUpdateService(id,req.body)
        return res.status(200).json(updatedCombustivel)
    }catch(error){
        return res.status(400).json({message:'Erro ao atualizar'})
    }
}

//Deletando um combustivel
export const combustivelDeleteController = async(req:Request,res:Response):Promise<Response> => {
    const id = Number(req.params.id)
    try{
        const deletedCombustivel:CombustivelReturn = await combustivelDeleteService(id)
        return res.status(204).json({message: 'Compra apagado com sucesso'});
    }catch(error){
        return res.status(400).json({message:'Erro ao deletar'})
    }
}