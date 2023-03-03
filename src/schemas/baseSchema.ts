import joi from "joi";
import { CreateBaseData } from "../repositories/baseRepository.js";

export const schema = joi.object<CreateBaseData>({
    title: joi.string().required(),
    facade: joi.string().required(),
    city: joi.string().valid("Nova York", " Rio de Janeiro", "Tóquio").required(),
    technology: joi.string().valid("laboratório de nanotecnologia", "jardim de ervas venenosas", "estande de tiro", "academia de parkour").required()
});