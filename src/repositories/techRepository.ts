import { ObjectId } from "mongodb";
import { Tech } from "../models/technology.js";

async function findAll() {
    return await Tech.find();
}

async function find(baseId: string) {
    return await Tech.find({ baseId: new ObjectId(baseId) });
}

async function remove(id: ObjectId) {
    return await Tech.findOneAndRemove({_id: new ObjectId(id)});
}

export const techRepository = {
    findAll,
    find,
    remove
}