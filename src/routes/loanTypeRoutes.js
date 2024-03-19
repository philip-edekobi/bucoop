import { Router } from "express";
import { auth, isAdmin } from "../middleware/index.js";
import { allLT, createLT } from "../controllers/loanType.js";

const router = Router();

router.post("", auth, isAdmin, createLT);

router.get("", allLT);

export default router;
