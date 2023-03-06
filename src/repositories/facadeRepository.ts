import { ObjectId } from "mongodb";
import { Facade } from "../models/facade.js";

async function findAll() {
    return await Facade.find();
}

async function find(baseId: string) {
    return await Facade.find({ baseId: new ObjectId(baseId) });
}

async function remove(id: ObjectId) {
    return await Facade.findOneAndRemove({_id: new ObjectId(id)});
}

export const facadeRepository = {
    findAll,
    find,
    remove
}