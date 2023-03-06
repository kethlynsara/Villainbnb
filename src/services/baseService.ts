import axios from "axios";
import dayjs from "dayjs";
import dotenv from "dotenv";
dotenv.config();

import { baseRepository, CreateBaseData } from "../repositories/baseRepository.js";
import { facadeRepository } from "../repositories/facadeRepository.js";
import { techRepository } from "../repositories/techRepository.js";

async function checkBase(title: string) {
    const base = await baseRepository.getBase(title);
    console.log(base)
    if (base.length !== 0) throw { type: "unauthorized", message: "base already exists" };
}

async function getMeanTemp(city: string) {
    let sum = 0;
    if (city == "Nova York") city = "New York";

    for (let i = 1; i <= 7; i++) {
        const day = dayjs().subtract(i, 'day').format('YYYY-MM-DD');
        const  { data } = await axios.get(`${process.env.WEATHER_URL}key=${process.env.APIKEY}&q=${city}&dt=${day}`);
        const tempDay = data.forecast.forecastday[0].day.avgtemp_c;
        sum += tempDay;
    }
    sum = sum / 7;
    return sum.toFixed(1);
}

async function findAll() {
    const bases = await baseRepository.findAll();
    const techs = await techRepository.findAll();

    const aux = [];
    bases.forEach((base, index) => {
        const techFilter = techs.filter((t) => {
            if (base._id.toString() == t.baseId.toString()) {
                return t.name;
            }
        });
        aux[index] = { 
            id: base._id,
            title: base.title,
            city: base.city,
            meanTemp: base.meanTemp,
            technologies: techFilter 
        };
    })
    return aux;
}

async function insert(data: CreateBaseData) {
    await checkBase(data.title);
    const meanTempString: string = await getMeanTemp(data.city);
    const meanTemp = parseFloat(meanTempString);
    await baseRepository.insert({...data, meanTemp});
}

async function deleteTechs(baseId: string) {
    const techs = await techRepository.find(baseId);
    if (techs.length !== 0) {
        techs.forEach( async (tech) => {
            await techRepository.remove(tech._id);
        });
    }
}

async function deleteFacades(baseId: string) {
    const facades = await facadeRepository.find(baseId);
    if (facades.length !== 0) {
        facades.forEach( async (facade) => {
            await facadeRepository.remove(facade._id);
        });
    }
}

async function remove(baseId: string) {
    const base = await baseRepository.getById(baseId);
    if (base) {
        await deleteTechs(baseId);
        await deleteFacades(baseId);
        await baseRepository.remove(baseId);
    } else {
        throw {
            type: "not found",
            message: "base not found"
        }
    }
}

export const baseService = {
    findAll,
    insert,
    remove
}