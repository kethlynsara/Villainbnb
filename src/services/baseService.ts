import axios from "axios";
import dayjs from "dayjs";
import dotenv from "dotenv";
dotenv.config();

import { baseRepository, CreateBaseData } from "../repositories/baseRepository.js";

async function checkBase(title: string, operation: "insert" | "update" | "rent") {
    const base = await baseRepository.getByParameter("title", title);
    if (base.length !== 0 && operation == "insert") {
        throw { 
            type: "conflict", 
            message: "base already exists" 
        }
    }

    if (base.length !== 0 && operation == "update") {
        throw { 
            type: "conflict", 
            message: "title already exists" 
        }
    }

    if (base.length == 0 && operation == "rent") {
        throw { 
            type: "not found", 
            message: "base not found" 
        }
    }
    return base;
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
    await checkBase(data.title, "insert");
    const meanTempString: string = await getMeanTemp(data.city);
    const meanTemp = parseFloat(meanTempString);
    await baseRepository.insert({...data, meanTemp});
}

async function update(baseId: string, data: CreateBaseData) {
    const base = await baseRepository.getById(baseId);
    if (base) {
        await checkBase(data.title, "update");
        const meanTempString: string = await getMeanTemp(data.city);
        const meanTemp = parseFloat(meanTempString);
        await baseRepository.update(baseId, {...data, meanTemp});
    } else {
        throw {
            type: "not found",
            message: "base not found"
        }
    }
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

async function checkPassword(villainPassword: string) {
    if (villainPassword !== process.env.VILLAIN_PASSWORD) {
        throw {
            type: "unauthorized",
            message: "Wrong password!"
        }
    }
}

async function rentBase(title: string, villain: string, password: string) {
    await checkPassword(password);
    const data = await checkBase(title, "rent");
    const base = await baseRepository.getById(data[0]._id.toString());

    if (!base.villain) {
        await baseRepository.postRent(base._id.toString(), villain);
        return { facadeName: base.facade };
    } else {
        throw {
            type: "conflict",
            message: "Base is already rented!"
        }
    }
}

export const baseService = {
    getByParameter,
    findAll,
    insert,
    update,
    remove,
    rentBase
}