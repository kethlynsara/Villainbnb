import { ObjectId } from "mongodb";
import { Base } from "../models/base.js";
import { Facade } from "../models/facade.js";
import { Tech } from "../models/technology.js";

export interface CreateBaseData {
    title: string,
    facade: string[],
    city: string,
    technologies: string[],
    meanTemp?: number
};

async function findAll() {
    return await Base.find();
}

async function getBase(title: string) {
    const base = await Base.find({title});
    return base;
}

async function getById(id: string) {
    return await Base.findOne({_id: new ObjectId(id)});
}

async function insert(data: CreateBaseData) {
    const base = new Base({
        title: data.title,
        city: data.city,
        meanTemp: data.meanTemp
    });

    const doc = await base.save();

    data.facade.forEach(async (fac) => {
        const facade = new Facade({
            name: fac,
            baseId: doc._id
        });
        await facade.save();
    });

    data.technologies.forEach(async (tech) => {
        const technology = new Tech({
            name: tech,
            baseId: doc._id
        });
        await technology.save();
    });
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