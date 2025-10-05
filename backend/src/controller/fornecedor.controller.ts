import { Request, Response} from "express";
import { fornecedorCreateService, FornecedorReturn, fornecedorListService, fornecedorListOneService, fornecedorUpdateService, fornecedorInativaService, fornecedorDeleteService} from "../services/fornecedor.service";


//Grava um novo fornecedor
export const fornecedorCreateController = async (req: Request, res: Response):Promise<Response>=>{

    try{
        const newFornecedor: FornecedorReturn = await fornecedorCreateService(req.body);      
        return res.status(201).json(newFornecedor);
    }catch(error){
        return res.status(500).json({ message: 'Erro interno' });
    }

}

//Lista todos os fornecedores
export const fornecedorListController = async (req: Request, res: Response):Promise<Response>=>{
    try{
        const fornecedores: FornecedorReturn[] = await fornecedorListService();
        return res.status(200).json(fornecedores);  
    }catch(error){
        return res.status(500).json({ message: 'Erro interno' });   
    }
}

//Pega um fornecedor
export const fornecedorListOneController = async (req: Request, res: Response):Promise<Response>=>{
    const id = Number(req.params.id); 
    try{
        const fornecedor: FornecedorReturn = await fornecedorListOneService(id);
        
        if(!fornecedor){
            return res.status(404).json({ message: 'Fornecedor não encontrado' });  
        }

        return res.status(200).json(fornecedor); 

    }catch(error){
        return res.status(404).json({ message: 'Fornecedor não encontrado' });      
    }
}

//Atualiza um fornecedor
export const fornecedorUpdateController = async (req: Request, res: Response):Promise<Response>=>{

    //Pego o id da requisição
    const id = Number(req.params.id);   

    try{
        const fornecedor: FornecedorReturn = await fornecedorUpdateService(id,req.body);
        return res.status(200).json(fornecedor);        
    }catch(error){
        return res.status(404).json({ message: 'Fornecedor não encontrado' });      
    }
}

//Inativa um fornecedor
export const fornecedorInativaController = async (req: Request, res: Response):Promise<Response>=>{
    const id = Number(req.params.id);   
    try{
        const fornecedor: FornecedorReturn = await fornecedorInativaService(id);
        return res.status(200).json(fornecedor);        
    }catch(error){
        return res.status(404).json({ message: 'Fornecedor não encontrado' });      
    }
}

//Apaga o fornecedor
export const fornecedorDeleteController = async(req:Request, res: Response):Promise<Response> => {
    const id = Number(req.params.id);
    try{
        const fornecedor:FornecedorReturn = await fornecedorDeleteService(id);
        return res.status(204).json({message: 'Fornecedor apagado com sucesso'});
    } catch(error){
        return res.status(404).json({ message: 'Fornecedor não encontrado' });
    }

}