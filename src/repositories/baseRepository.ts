import { ObjectId } from "mongodb";
import { Base } from "../models/base.js";

export interface CreateBaseData {
    title: string,
    facade: string[],
    city: string,
    technologies: string[],
    meanTemp?: number
}

async function findAll() {
    return await Base.find().select('_id title city meanTemp technologies');
}

async function getById(id: string) {
    return await Base.findOne({_id: new ObjectId(id)});
}

async function getByParameter(field: string, value: string) {
    return await Base.find({}).where(`${field}`).equals(value).select('_id title city meanTemp technologies');
}

async function insert(data: CreateBaseData) {
    const base = new Base(data);
    return await base.save();
}

async function remove(baseId: string) {
    return await Base.findOneAndRemove({ _id: new ObjectId(baseId)});
}

export const baseRepository = {
    getById,
    findAll,
    insert,
    remove,
    getByParameter
}