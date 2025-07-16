import { Router, Request, Response } from 'express';
const router = Router();
router.post('/query', (_req: Request, res: Response) => res.json({ message: 'AI query endpoint' }));
export default router; 