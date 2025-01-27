import { Router } from "express";
import gralRouter from "./appFlows";

const router = Router();
router.use('/chatbot', gralRouter);

export default router;