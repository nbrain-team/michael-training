import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => res.json({ message: 'Coaching endpoint' }));
export default router; 