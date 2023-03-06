import { Schema, model } from "mongoose";

export interface IBase {
    title: string,
    facade: string[]
    city: string,
    meanTemp: number;
    technologies: string[]
}

const baseSchema = new Schema<IBase>({
    title: { type: String, required: true, unique: true },
    facade: { type: [String], required: true},
    city: { 
        type: String, 
        enum: ["Nova York", "Rio de Janeiro", "Tóquio"],
        required: true
    },
    meanTemp: { 
        type: Number,
        required: true
    },
    technologies: { 
        type: [String],
        enum: ["laboratório de nanotecnologia", "jardim de ervas venenosas", "estande de tiro", "academia de parkour"],
        required: true
    }
});

export const Base = model<IBase>("Base", baseSchema);