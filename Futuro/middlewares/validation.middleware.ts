/*
import Send from "../utils/response.utils.ts";
import type { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from "zod";

class ValidationMiddleware {
    static validateBody(schema: ZodSchema) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse(req.body);
                next();
            } catch (error) {
                // Verificar se o erro é uma instância de ZodError
                if (error instanceof ZodError) {
                    const formattedErrors: Record<string, string[]> = {};

                    // Usando uma abordagem segura para acessar os erros
                    for (const err of error.issues) {
                        const field = err.path.join("."); // Nome do campo
                        if (!formattedErrors[field]) {
                            formattedErrors[field] = [];
                        }
                        formattedErrors[field].push(err.message); // Mensagem de erro
                    }

                    return Send.validationErrors(res, formattedErrors);
                }

                // Caso o erro não seja do tipo ZodError, envia uma resposta genérica
                return Send.error(res, "Invalid request data");
            }
        };
    }
}
export default ValidationMiddleware;
*/