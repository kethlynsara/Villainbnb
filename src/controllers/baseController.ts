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

    if (id) {
        await baseService.update(id, body);
        return res.status(204).send("Base updated successfully!");
    } else {
        return res.sendStatus(400);
    }
}

export async function remove(req: Request, res: Response) {
    const { baseId } = req.params;
    if (baseId) {
        await baseService.remove(baseId);
        return res.status(204).send("Successfully removed base!");
    } else {
        return res.sendStatus(400);
    }
}

export async function rentBase(req: Request, res: Response) {
    const { title, villainName, password }: { title:string, villainName: string, password: string } = req.body;
    const facadeName = await baseService.rentBase(title, villainName, password);
    return res.send(facadeName);
}