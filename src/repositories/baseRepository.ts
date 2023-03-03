// import db from "../config/db.js";

export interface Base {
    id: number,
    title: string,
    facade: string,
    city: string,
    technology: string
};

export type CreateBaseData = Omit<Base, "id">;

// async function getByTitle(name: string) {
//     const book = await db.collection("bases").findOne({title: name});
//     console.log('rep', book);
// }

// async function insert(data: CreateBaseData) {
//     return await db.collection("bases").insertOne(data);
// }