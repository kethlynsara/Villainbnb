import { Request, Response, NextFunction } from "express";

export function errorHandler(error, req: Request, res: Response, next: NextFunction) {
    console.log(error);
    if (error.type) {
        return res.status(errorTypeToStatusCode(error.type)).send(error.message);
    }
}

function errorTypeToStatusCode(errorType: string) {
    if (errorType == "conflict") return 409;
    if (errorType == "not found") return 404;
    if (errorType == "unauthorized") return 401;
    return 400;
}