import { Router } from "express";
import { validateData } from "../middlewares/baseMiddleware.js";

const baseRouter = Router();

baseRouter.post("/base/create", validateData);

export default baseRouter;