import { Router, Request, Response } from 'express';
const router = Router();
router.get('/', (_req: Request, res: Response) => res.json({ message: 'Content endpoint' }));
export default router; 