import { Request, Response} from "express";
import { BuyReturn, buyCreateService, buyDeleteService, buyListOneService, buyListService, buyUpdateService } from "../services/compras.service";


//Grava um novo compras
export const comprasCreateController = async (req: Request, res: Response):Promise<Response>=>{

    try{
        const newBuy: BuyReturn = await buyCreateService(req.body);      
        return res.status(201).json(newBuy);
    }catch(error:any){
        return res.status(500).json({  message: error.message });
    }

}

//Lista todos os compras
export const comprasListController = async (req: Request, res: Response):Promise<Response>=>{
    try{
        const newBuy: BuyReturn[] = await buyListService();
        return res.status(200).json(newBuy);  
    }catch(error:any){
        return res.status(500).json({ message: error.message});   
    }
}

//Pega uma compra 
export const comprasListOneController = async (req: Request, res: Response):Promise<Response>=>{
    const id = Number(req.params.id); 
    try{
        const newBuy: BuyReturn = await buyListOneService(id);
        return res.status(200).json(newBuy);        
    }catch(error:any){
        return res.status(404).json({ message: error.message});      
    }
}

//Atualiza uma compra
export const buyUpdateController = async (req: Request, res: Response):Promise<Response>=>{

    //Pego o id da requisição
    const id = Number(req.params.id);   

    try{
        const newBuy: BuyReturn = await buyUpdateService(id,req.body);
        return res.status(200).json(newBuy);        
    }catch(error:any){
        return res.status(404).json({  message: error.message });      
    }
}

//Apaga uma compra
export const buyDeleteController = async(req:Request, res: Response):Promise<Response> => {
    const id = Number(req.params.id);
    try{
        const newBuy:BuyReturn = await buyDeleteService(id);
        return res.status(204).json({message: 'Compra apagado com sucesso'});
    } catch(error:any){
        return res.status(404).json({ message: error.message });
    }

}