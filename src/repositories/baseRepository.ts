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
    try {
        const base = Base.find({title});
        return base;
    } catch (error) {
        console.log(error);
    }
}

async function insert(data: CreateBaseData) {
    const base = new Base({
        title: data.title,
        city: data.city,
        meanTemp: data.meanTemp
    });

    try {
        const doc = await base.save();
        console.log('doc', doc)

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
        
    } catch (error) {
        console.log('db err', error);
    }
}

export const baseRepository = {
    insert,
    getByTitle
}