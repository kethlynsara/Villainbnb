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

async function getByTitle(title: string) {
    const base = await Base.find({title});
    return base;
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

export const baseRepository = {
    insert,
    getByTitle
}

function then(arg0: (doc: any) => any) {
    throw new Error("Function not implemented.");
}
