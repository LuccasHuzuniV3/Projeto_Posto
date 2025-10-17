"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFornecedor = exports.isAdmin = void 0;
//Vendo se é admin
const isAdmin = (req, res, next) => {
    const role = req.session?.usuario?.role;
    if (role === 'Admin') {
        return next();
    }
    return res.status(403).json({ message: 'Acesso negado. Requer privilégios de administrador.' });
};
exports.isAdmin = isAdmin;
//validando o fornecedor
const isFornecedor = (req, res, next) => {
    const user = req.session?.usuario;
    if (user && user.role === 'Fornecedor' && user.fornecedorId) {
        // Se sim, deixa a requisição continuar
        return next();
    }
    return res.status(403).json({ message: 'Acesso negado. Requer privilégios de fornecedor.' });
};
exports.isFornecedor = isFornecedor;
//# sourceMappingURL=auth.middleware.js.map