import joi from "joi";
import { CreateBaseData } from "../repositories/baseRepository.js";

export const schema = joi.object<CreateBaseData>({
    title: joi.string().required(),
    facade: joi.array().required(),
    city: joi.string().valid("Nova York", "Rio de Janeiro", "Tóquio").required(),
    technologies: joi.array()
                     .items(joi.string()
                     .valid("laboratório de nanotecnologia","jardim de ervas venenosas", "estande de tiro", "academia de parkour"))
                     .required()
});