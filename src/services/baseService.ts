import { baseRepository, CreateBaseData } from "../repositories/baseRepository.js";

async function insert(data: CreateBaseData) {
    await baseRepository.insert(data);
}

export const baseService = {
    insert
}