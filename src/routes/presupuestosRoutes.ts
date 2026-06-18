import { Router } from 'express';
import { crearPresupuesto } from '../controllers/presupuestosController';

const router = Router();

router.post('/', crearPresupuesto);

export default router;
