import { baseRepository, CreateBaseData } from "../repositories/baseRepository.js";

async function checkTitle(title: string) {
    const base = await baseRepository.getByTitle(title);
    if (base.length !== 0) return false;
    else return true;
}

async function insert(data: CreateBaseData) {
    const dbTitle = await checkTitle(data.title);
    if (!dbTitle) return false;
    else await baseRepository.insert(data);
}

export const baseService = {
    insert
}