import { Router } from 'express';
import { getConfig, updateConfig } from '../controllers/configController';

const router = Router();

router.get('/', getConfig);
router.patch('/', updateConfig);

export default router;
