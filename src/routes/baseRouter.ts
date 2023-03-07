import { Router } from "express";
import { findAll, insert, remove, update } from "../controllers/baseController.js";
import { validateData } from "../middlewares/baseMiddleware.js";

const baseRouter = Router();

baseRouter.get("/base", findAll);
baseRouter.post("/base/create", validateData, insert);
baseRouter.put("/base", update);
baseRouter.delete("/base/:baseId", remove);

export default baseRouter;