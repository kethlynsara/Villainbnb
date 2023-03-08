import { Router } from "express";
import { findAll, insert, remove, rentBase, update } from "../controllers/baseController.js";
import { validateData, validateRentData } from "../middlewares/baseMiddleware.js";

const baseRouter = Router();

baseRouter.get("/base", findAll);
baseRouter.post("/base/create", validateData, insert);
baseRouter.post("/base/rent", validateRentData, rentBase);
baseRouter.put("/base/:id", validateData, update);
baseRouter.delete("/base/:baseId", remove);

export default baseRouter;