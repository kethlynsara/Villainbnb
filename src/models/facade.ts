import { Schema, model } from "mongoose";

export interface IFacade {
    name: string,
    baseId: Schema.Types.ObjectId
}

const facadeSchema = new Schema<IFacade>({
    name: { type: String, required: true },
    baseId: { type: Schema.Types.ObjectId, required: true }
});

export const Facade = model<IFacade>("Facade", facadeSchema);