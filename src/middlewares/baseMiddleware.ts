import { Request, Response, NextFunction } from "express";
import { CreateBaseData } from "../repositories/baseRepository.js";
import { rentSchema, schema } from "../schemas/baseSchema.js";

export async function validateData(req: Request, res: Response, next: NextFunction) {
    const { body }: { body: CreateBaseData } = req;
    
    const { error } = schema.validate(body, {abortEarly: false});
    if (error) return res.status(422).send(error.details.map((detail) => detail.message));
    
    if (body.facade.includes(body.title)) return res.status(422).send("title and facade must be different");
    
    next();
}

export async function validateRentData(req: Request, res: Response, next: NextFunction) {
    const { body }: { body: CreateBaseData } = req;    
    const { error } = rentSchema.validate(body, {abortEarly: false});
    if (error) return res.status(422).send(error.details.map((detail) => detail.message));
    
    next();
}