"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const fornecedor_controller_1 = require("../controller/fornecedor.controller");
const compras_controller_1 = require("../controller/compras.controller");
const preco_controller_1 = require("../controller/preco.controller");
const combustivel_controller_1 = require("../controller/combustivel.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const user_controller_1 = require("../controller/user.controller");
exports.routes = (0, express_1.Router)();
//Rotas de login
exports.routes.post('/register', auth_controller_1.registerController);
exports.routes.post('/login', auth_controller_1.loginController);
//Rotas de fornecedor
exports.routes.post('/fornecedor', auth_middleware_1.isAdmin, fornecedor_controller_1.fornecedorCreateController);
exports.routes.get('/fornecedor', auth_middleware_1.isAdmin, fornecedor_controller_1.fornecedorListController);
exports.routes.get('/fornecedor/:id', auth_middleware_1.isAdmin, fornecedor_controller_1.fornecedorListOneController);
exports.routes.put('/fornecedor/:id', auth_middleware_1.isAdmin, fornecedor_controller_1.fornecedorUpdateController);
exports.routes.delete('/fornecedor/:id', auth_middleware_1.isAdmin, fornecedor_controller_1.fornecedorInativaController);
exports.routes.delete('/fornecedor/delete/:id', auth_middleware_1.isAdmin, fornecedor_controller_1.fornecedorDeleteController); // Rota para exclusão permanente
//Compras
exports.routes.post('/compras', auth_middleware_1.isAdmin, compras_controller_1.comprasCreateController);
exports.routes.get('/compras', auth_middleware_1.isAdmin, compras_controller_1.comprasListController);
exports.routes.get('/compras/:id', auth_middleware_1.isAdmin, compras_controller_1.comprasListOneController);
exports.routes.put('/compras/:id', auth_middleware_1.isAdmin, compras_controller_1.buyUpdateController);
exports.routes.delete('/compras/:id', auth_middleware_1.isAdmin, compras_controller_1.buyDeleteController);
//Preco
exports.routes.post('/preco', auth_middleware_1.isAdmin, preco_controller_1.precoCreateController); // Cria um novo preco
exports.routes.get('/preco', auth_middleware_1.isAdmin, preco_controller_1.precoListController); // Lista todos os precos
exports.routes.get('/preco/atual', auth_middleware_1.isAdmin, preco_controller_1.precoRecentController); //Preco mais recente
exports.routes.get('/preco/:id', auth_middleware_1.isAdmin, preco_controller_1.precoListOneController); // Pega um preco pelo ID
exports.routes.put('/preco/:id', auth_middleware_1.isAdmin, preco_controller_1.precoUpdateController); // Atualizar um preco
exports.routes.delete('/preco/:id', auth_middleware_1.isAdmin, preco_controller_1.precoDeleteController); // Deletar um preco
//Combustivel
exports.routes.post('/combustivel', auth_middleware_1.isAdmin, combustivel_controller_1.combustivelCreateController);
exports.routes.get('/combustivel', auth_middleware_1.isAdmin, combustivel_controller_1.combustivelListController);
exports.routes.get('/combustivel/:id', auth_middleware_1.isAdmin, combustivel_controller_1.combustivelListOneController);
exports.routes.put('/combustivel/:id', auth_middleware_1.isAdmin, combustivel_controller_1.combustivelUpdateController);
exports.routes.delete('/combustivel/:id', auth_middleware_1.isAdmin, combustivel_controller_1.combustivelDeleteController);
//Rotas dos fornecedor
exports.routes.post('/meu-preco', auth_middleware_1.isFornecedor, preco_controller_1.precoFornecedorCreateController);
//Rotas dos usuario
exports.routes.get('/user', user_controller_1.userListController);
//routes.post('/user',userCreateController)
exports.routes.put('/user:id', user_controller_1.userUpdateController);
exports.routes.get('/user/:id', user_controller_1.userListOne);
exports.routes.delete('/user/:id', user_controller_1.userDeleteController);
//# sourceMappingURL=index.js.map