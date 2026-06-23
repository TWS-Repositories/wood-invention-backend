import { Router } from "express";
import {
  listarMaderas,
  crearMadera,
  actualizarMadera,
  eliminarMadera,
} from "../controllers/maderasController";
import {
  listarHerrajes,
  crearHerraje,
  actualizarHerraje,
  eliminarHerraje,
} from "../controllers/herrajesController";

const router = Router();

router.get("/maderas", listarMaderas);
router.post("/maderas", crearMadera);
router.put("/maderas/:id", actualizarMadera);
router.delete("/maderas/:id", eliminarMadera);

router.get("/herrajes", listarHerrajes);
router.post("/herrajes", crearHerraje);
router.put("/herrajes/:id", actualizarHerraje);
router.delete("/herrajes/:id", eliminarHerraje);

export default router;
