import { Router } from "express";
import { newAdmin, loginAdmin, allAdmin } from "../controllers/admin.js";
import { auth, isAdmin } from "../middleware/index.js";

const router = Router();

router.get("", auth, isAdmin, allAdmin);

router.post("", newAdmin);

router.post("/login", loginAdmin);

export default router;
