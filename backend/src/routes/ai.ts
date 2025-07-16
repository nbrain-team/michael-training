import { Router } from 'express';
const router = Router();
router.post('/query', (req, res) => res.json({ message: 'AI query endpoint' }));
export default router; 