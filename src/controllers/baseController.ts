import { Request, Response } from "express";
import { CreateBaseData } from "../repositories/baseRepository.js";
import { baseService } from "../services/baseService.js";

export async function findAll(req: Request, res: Response) {
    const bases = await baseService.findAll();
    res.send(bases);
}

export async function insert(req: Request, res: Response) {
    const { body } : { body: CreateBaseData} = req;
    await baseService.insert(body);
    return res.sendStatus(201);
} 