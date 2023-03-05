import { Schema, model } from "mongoose";

export interface ITech {
    name: string,
    baseId: Schema.Types.ObjectId
}

const techSchema = new Schema<ITech>({
    name: { 
        type: String, 
        enum: ["laboratório de nanotecnologia", "jardim de ervas venenosas", "estande de tiro", "academia de parkour"],
        required: true 
    },    
    baseId: { type: Schema.Types.ObjectId, required: true }
});

export const Tech = model<ITech>("Tech", techSchema);