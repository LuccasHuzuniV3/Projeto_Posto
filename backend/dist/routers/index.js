"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const fornecedor_controller_1 = require("../controller/fornecedor.controller");
const compras_controller_1 = require("../controller/compras.controller");
const preco_controller_1 = require("../controller/preco.controller");
const combustivel_controller_1 = require("../controller/combustivel.controller");
exports.routes = (0, express_1.Router)();
//Rotas de login
exports.routes.post('/register', auth_controller_1.registerController);
exports.routes.post('/login', auth_controller_1.loginController);
//Rotas de fornecedor
exports.routes.post('/fornecedor', fornecedor_controller_1.fornecedorCreateController);
exports.routes.get('/fornecedor', fornecedor_controller_1.fornecedorListController);
exports.routes.get('/fornecedor/:id', fornecedor_controller_1.fornecedorListOneController);
exports.routes.put('/fornecedor/:id', fornecedor_controller_1.fornecedorUpdateController);
exports.routes.delete('/fornecedor/:id', fornecedor_controller_1.fornecedorInativaController);
exports.routes.delete('/fornecedor/delete/:id', fornecedor_controller_1.fornecedorDeleteController); // Rota para exclusão permanente
//Compras
exports.routes.post('/compras', compras_controller_1.comprasCreateController);
exports.routes.get('/compras', compras_controller_1.comprasListController);
exports.routes.get('/compras/:id', compras_controller_1.comprasListOneController);
exports.routes.put('/compras/:id', compras_controller_1.buyUpdateController);
exports.routes.delete('/compras/:id', compras_controller_1.buyDeleteController);
//Preco
exports.routes.post('/preco', preco_controller_1.precoCreateController); // Cria um novo preco
exports.routes.get('/preco', preco_controller_1.precoListController); // Lista todos os precos
exports.routes.get('/preco/:id', preco_controller_1.precoListOneController); // Pega um preco pelo ID
exports.routes.get('/preco/atualPreco', preco_controller_1.precoRecentController); //Preco mais recente
exports.routes.put('/preco/:id', preco_controller_1.precoUpdateController); // Atualizar um preco
exports.routes.delete('/preco/:id', preco_controller_1.precoDeleteController); // Deletar um preco
//Combustivel
exports.routes.post('/combustivel', combustivel_controller_1.combustivelCreateController);
exports.routes.get('/combustivel', combustivel_controller_1.combustivelListController);
exports.routes.get('/combustivel/:id', combustivel_controller_1.combustivelListOneController);
exports.routes.put('/combustivel/:id', combustivel_controller_1.combustivelUpdateController);
exports.routes.delete('/combustivel/:id', combustivel_controller_1.combustivelDeleteController);
//# sourceMappingURL=index.js.map