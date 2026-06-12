import { Router } from 'express';
import { listarMaderas } from '../controllers/maderasController';
import { listarHerrajes } from '../controllers/herrajesController';

const router = Router();

router.get('/maderas', listarMaderas);

router.get('/herrajes', (req, res, next) => {
  console.log("Entró a la ruta /herrajes");
  next();
}, listarHerrajes);

export default router;