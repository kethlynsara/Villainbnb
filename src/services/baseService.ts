import axios from "axios";
import dayjs from "dayjs";
import dotenv from "dotenv";
dotenv.config();

import { baseRepository, CreateBaseData } from "../repositories/baseRepository.js";

async function checkBase(title: string) {
    const base = await baseRepository.getByParameter("title", title);
    if (base.length !== 0) {
        throw { 
            type: "conflict", 
            message: "base already exists" 
        }
    }
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

async function getByParameter(field: string, value: string) {
    return await baseRepository.getByParameter(field, value);
}

async function findAll() {
    return await baseRepository.findAll();
}

async function insert(data: CreateBaseData) {
    await checkBase(data.title);
    const meanTempString: string = await getMeanTemp(data.city);
    const meanTemp = parseFloat(meanTempString);
    await baseRepository.insert({...data, meanTemp});
}

async function remove(baseId: string) {
    const base = await baseRepository.getById(baseId);
    if (base) {
        await baseRepository.remove(baseId);
    } else {
        throw {
            type: "not found",
            message: "base not found"
        }
    }
}


export const baseService = {
    getByParameter,
    findAll,
    insert,
    remove,
}