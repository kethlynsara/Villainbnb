import { Request, Response, NextFunction } from "express";
import { CreateBaseData } from "../repositories/baseRepository.js";
import { schema } from "../schemas/baseSchema.js";

export async function validateData(req: Request, res: Response, next: NextFunction) {
    const { body }: { body: CreateBaseData } = req;
    
    const { error } = schema.validate(body, {abortEarly: false});
    if (error) return res.status(422).send(error.details.map((detail) => detail.message));
    
    if (body.facade.includes(body.title)) return res.status(422).send("title and facade must be different");
    
    next();
}