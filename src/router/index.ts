import { Router } from 'express';
import infoRoutes from './Info';

const router = Router();

router.use('/info', infoRoutes);

export default router;