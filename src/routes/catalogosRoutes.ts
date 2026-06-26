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
import { isAuth } from "../middleware/auth";

const router = Router();

// Maderas - GET es público, POST/PUT/DELETE requieren autenticación
router.get("/maderas", listarMaderas);
router.post("/maderas", isAuth, crearMadera);
router.put("/maderas/:id", isAuth, actualizarMadera);
router.delete("/maderas/:id", isAuth, eliminarMadera);

// Herrajes - GET es público, POST/PUT/DELETE requieren autenticación
router.get("/herrajes", listarHerrajes);
router.post("/herrajes", isAuth, crearHerraje);
router.put("/herrajes/:id", isAuth, actualizarHerraje);
router.delete("/herrajes/:id", isAuth, eliminarHerraje);

export default router;
