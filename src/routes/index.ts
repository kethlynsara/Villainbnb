import { Router } from "express";
import baseRouter from "./baseRouter.js";

const router = Router();

router.use(baseRouter);

export default router;