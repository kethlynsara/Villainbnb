import { Router } from "express";
import { insert } from "../controllers/baseController.js";
import { validateData } from "../middlewares/baseMiddleware.js";

const baseRouter = Router();

baseRouter.post("/base/create", validateData, insert);

export default baseRouter;