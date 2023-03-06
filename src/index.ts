import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app/app.js";
dotenv.config();

const port = +process.env.PORT || 5000;

try {
    mongoose.connect(process.env.MONGO_URI);        
    app.listen(port, () => {
        console.log(`Server is up and running on port ${port}`);
    });
} catch (error) {
    console.log(error);
    throw new Error("Failed to connect to database");    
}