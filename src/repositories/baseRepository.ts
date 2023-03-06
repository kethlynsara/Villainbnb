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

async function getBase(title: string) {
    const base = await Base.find({title});
    return base;
}

async function getById(id: string) {
    return await Base.findOne({_id: new ObjectId(id)});
}

async function insert(data: CreateBaseData) {
    const base = new Base(data);
    return await base.save();
}

async function remove(baseId: string) {
    return await Base.findOneAndRemove({ _id: new ObjectId(baseId)});
}

export const baseRepository = {
    getBase,
    getById,
    findAll,
    insert,
    remove
}