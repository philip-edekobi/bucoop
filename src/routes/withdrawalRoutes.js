import { Router } from "express";
import { auth, isAdmin } from "../middleware/index.js";
import { allWd } from "../controllers/withdrawal.js";

const router = Router();

router.get("", auth, isAdmin, allWd);

export default router;
