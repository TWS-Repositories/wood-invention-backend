import { Router } from 'express';
import { listarMaderas } from '../controllers/maderasController';
import { listarHerrajes } from '../controllers/herrajesController';

const router = Router();

router.get('/maderas', listarMaderas);

router.get('/herrajes', listarHerrajes);

export default router;