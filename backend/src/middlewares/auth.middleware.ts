import {Request, Response, NextFunction} from "express"


declare module 'express-session' {
  interface SessionData {
    usuario: {
      id: number;
      role: string;
      fornecedorId?:number
    };
  }
}


//Vendo se é admin
export const  isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const role = req.session.usuario?.role;
    if (role === 'Admin') {
        return next();
    }
    return res.status(403).json({ message: 'Acesso negado. Requer privilégios de administrador.' });
}

//validando o fornecedor
export const isFornecedor = (req: Request, res: Response, next: NextFunction)=> {
    const user = req.session.usuario;

    if (user && user.role === 'Fornecedor' && user.fornecedorId) {
        // Se sim, deixa a requisição continuar
        return next();
    }
    return res.status(403).json({ message: 'Acesso negado. Requer privilégios de fornecedor.' });
}



