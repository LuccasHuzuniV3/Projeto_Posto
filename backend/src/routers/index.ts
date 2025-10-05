import { Router } from "express";
import { loginController, registerController } from "../controller/auth.controller";
import { fornecedorCreateController, fornecedorInativaController, fornecedorListController, fornecedorListOneController, fornecedorUpdateController,fornecedorDeleteController } from "../controller/fornecedor.controller";      
import { comprasCreateController, comprasListController, comprasListOneController, buyUpdateController, buyDeleteController } from "../controller/compras.controller";
import { precoCreateController,precoListController, precoListOneController, precoUpdateController, precoDeleteController,precoRecentController, precoFornecedorCreateController } from "../controller/preco.controller"; 
import { combustivelCreateController, combustivelListController, combustivelListOneController, combustivelUpdateController, combustivelDeleteController } from "../controller/combustivel.controller";
import {isAdmin, isFornecedor} from "../middlewares/auth.middleware"

export const routes: Router = Router()

//Rotas de login
routes.post('/register',registerController)
routes.post('/login',loginController)

//Rotas de fornecedor
routes.post('/fornecedor',isAdmin,fornecedorCreateController)
routes.get('/fornecedor',isAdmin,fornecedorListController)
routes.get('/fornecedor/:id',isAdmin,fornecedorListOneController)
routes.put('/fornecedor/:id',isAdmin,fornecedorUpdateController)
routes.delete('/fornecedor/:id',isAdmin,fornecedorInativaController)
routes.delete('/fornecedor/delete/:id',isAdmin,fornecedorDeleteController) // Rota para exclusão permanente

//Compras
routes.post('/compras',isAdmin,comprasCreateController)
routes.get('/compras',isAdmin,comprasListController)
routes.get('/compras/:id',isAdmin,comprasListOneController)
routes.put('/compras/:id',isAdmin,buyUpdateController)
routes.delete('/compras/:id',isAdmin,buyDeleteController)

//Preco
routes.post('/preco',isAdmin,precoCreateController)// Cria um novo preco
routes.get('/preco',isAdmin,precoListController)// Lista todos os precos
routes.get('/preco/atual',isAdmin,precoRecentController)//Preco mais recente
routes.get('/preco/:id',isAdmin,precoListOneController)// Pega um preco pelo ID
routes.put('/preco/:id',isAdmin,precoUpdateController)// Atualizar um preco
routes.delete('/preco/:id',isAdmin,precoDeleteController)// Deletar um preco


//Combustivel
routes.post('/combustivel',isAdmin,combustivelCreateController)
routes.get('/combustivel', isAdmin,combustivelListController)
routes.get('/combustivel/:id',isAdmin,combustivelListOneController)
routes.put('/combustivel/:id', isAdmin,combustivelUpdateController)
routes.delete('/combustivel/:id',isAdmin,combustivelDeleteController)


//Rotas dos fornecedor
routes.post('/meu-preco',isFornecedor,precoFornecedorCreateController)