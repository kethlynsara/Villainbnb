import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URI);

async function dbConnection() {
    try {
        await mongoClient.connect();
        db = mongoClient.db(process.env.DATABASE_NAME);
    } catch(error) {
        console.log(error);
    }  
}
dbConnection();

export default db;