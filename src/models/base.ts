import { Schema, model } from "mongoose";

export interface IBase {
    title: string,
    city: string,
    meanTemp: number;
}

const baseSchema = new Schema<IBase>({
    title: { type: String, required: true, unique: true },
    city: { 
        type: String, 
        enum: ["Nova York", "Rio de Janeiro", "Tóquio"],
        required: true
    },
    meanTemp: { 
        type: Number,
        required: true
    }
});

export const Base = model<IBase>("Base", baseSchema);