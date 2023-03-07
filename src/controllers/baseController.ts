import { Request, Response } from "express";
import { CreateBaseData } from "../repositories/baseRepository.js";
import { baseService } from "../services/baseService.js";

export async function findAll(req: Request, res: Response) {
    const title = req.query.title;
    const city = req.query.city;
    const tech = req.query.tech;
    let bases: CreateBaseData[];

    if (title) {
        bases = await baseService.getByParameter("title", title.toString());
    } else if (city) {
        bases = await baseService.getByParameter("city", city.toString());
    } else if (tech) {
        bases = await baseService.getByParameter("technologies", tech.toString());
    } else {
        bases = await baseService.findAll();    
    }    
    return res.send(bases);
}

export async function insert(req: Request, res: Response) {
    const { body } : { body: CreateBaseData} = req;
    await baseService.insert(body);
    return res.sendStatus(201);
} 

export async function update(req: Request, res: Response) {
    const { id } = req.params;
    const { body } : { body: CreateBaseData} = req;
    await baseService.update(id, body);
    return res.sendStatus(204);
}

export async function remove(req: Request, res: Response) {
    const { baseId } = req.params;
    await baseService.remove(baseId);
    res.sendStatus(204);
}