import supertest from "supertest";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "../src/app/app.js";
import { Base } from "../src/models/base.js";
dotenv.config({path: '.test.env'});

const bases = [
    {
        title: "Base de operações do Pinguim",
        facade: ["The Iceberg Lounge"],
        city: "Tóquio",
        meanTemp: 11.8,
        technologies: ["estande de tiro"]
    },
    {
        title: "Centro de agiotagens do Rio",
        facade: ["Carrara Taxi","Taxi Carrara"],
        city: "Rio de Janeiro",
        meanTemp: 29.3,
        technologies: ["jardim de ervas venenosas","academia de parkour"]
    },
    {
        title: "Centro de fofoca universal",
        facade: ["Wikilab"],
        city: "Nova York",
        meanTemp: 4.9,
        technologies: ["laboratório de nanotecnologia","academia de parkour"]
    },
    {
        title: "Fábrica de SMILE",
        facade: ["Coliseu Corrida"],
        city: "Tóquio",
        meanTemp: 11.8,
        technologies: ["laboratório de nanotecnologia","estande de tiro","jardim de ervas venenosas"]
    }     
];

beforeEach(async () => {
    await mongoose.disconnect();
    await mongoose.connect(process.env.MONGO_URI, {});
    await Base.deleteMany({});
    await Base.insertMany(bases);
}, 20000);

describe("base tests", () => {
    it("should create a base", async () => {
        const createBaseData = {
            title: "Test base",
            facade: ["Test facade"],
            city: "Tóquio",
            technologies: ["laboratório de nanotecnologia",
            "estande de tiro"]
        } 
        const response = await supertest(app).post("/base/create").send(createBaseData);
        expect(response.statusCode).toBe(201);
    });

    it("given equal title and facade name, should not create a base", async () => {
        const data = {
            title: "Test base",
            facade: ["Test base", "test base2"],
            city: "Rio de Janeiro",
            technologies: ["laboratório de nanotecnologia",
            "estande de tiro"]
        }
        const response = await supertest(app).post("/base/create").send(data);
        expect(response.statusCode).toBe(422);
    });

    it("title duplicated, should not create a base", async () => {
        const data = {
            title: "Test base",
            facade: ["test base", "test base2"],
            city: "Rio de Janeiro",
            technologies: ["laboratório de nanotecnologia",
            "estande de tiro"]
        }
        const response = await supertest(app).post("/base/create").send(data);
        expect(response.statusCode).toBe(201);
        const response2 = await supertest(app).post("/base/create").send(data);
        expect(response2.statusCode).toBe(409);
    }, 10000);

    it("title doesn't exist, should return an empty array", async () => {
        const createBaseData = {
            title: "Test base",
            facade: ["Test facade"],
            city: "Tóquio",
            technologies: ["laboratório de nanotecnologia",
            "estande de tiro"]
        } 
        const base = await supertest(app).get(`/base?title=${createBaseData.title}`);
        expect(base.body).toHaveLength(0);
    });

    it("should return an array of length 1, title parameter", async () => {
        const base = await supertest(app).get(`/base?title=${bases[0].title}`);
        expect(base.body).toHaveLength(1);
    });

    it("should return an array of length 2, tech parameter", async () => {
        const base = await supertest(app).get(`/base?tech=${bases[1].technologies[0]}`);
        expect(base.body).toHaveLength(2);
    });

    it("should return an array of length 2, city parameter", async () => {
        const base = await supertest(app).get(`/base?city=${bases[3].city}`);
        expect(base.body).toHaveLength(2);
    });

    it("should return an array of length 4, without parameters", async () => {
        const base = await supertest(app).get("/base");
        expect(base.body).toHaveLength(4);
    });

    it("should return an array of length 5 with all bases including the newly added base ", async () => {
        const createBaseData = {
            title: "Test base",
            facade: ["Test facade"],
            city: "Tóquio",
            technologies: ["laboratório de nanotecnologia",
            "estande de tiro"]
        } 
        const base = await supertest(app).post("/base/create").send(createBaseData);
        const base2 = await supertest(app).get("/base");
        expect(base2.body).toHaveLength(5);
    });
});

afterAll(async () => {
    await mongoose.disconnect();
});
  