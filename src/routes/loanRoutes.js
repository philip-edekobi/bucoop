import { Router } from "express";
import { auth, isAdmin } from "../middleware/index.js";
import { getLoans, modifyLoan } from "../controllers/loan.js";

const router = Router();

router.get("", auth, isAdmin, getLoans);

router.patch("/:id", auth, isAdmin, modifyLoan);

export default router;
