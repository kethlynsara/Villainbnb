import { Router } from "express";
import { findAll, insert } from "../controllers/baseController.js";
import { validateData } from "../middlewares/baseMiddleware.js";

const baseRouter = Router();

baseRouter.get("/base", findAll);
baseRouter.post("/base/create", validateData, insert);

export default baseRouter;