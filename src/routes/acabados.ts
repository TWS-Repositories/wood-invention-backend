import { Router } from "express";
import { getAcabados } from "../controllers/acabadosController";

const router = Router();

router.get("/", getAcabados);

export default router;
