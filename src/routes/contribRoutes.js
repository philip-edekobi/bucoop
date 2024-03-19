import { Router } from "express";
import { auth, isAdmin } from "../middleware/index.js";
import { allContribs } from "../controllers/contrib.js";

const router = Router();

router.get("", auth, isAdmin, allContribs);

export default router;
