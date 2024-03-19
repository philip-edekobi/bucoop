import { Router } from "express";
import { auth, isAdmin, isMember } from "../middleware/index.js";
import {
  allUsers,
  newUser,
  loginUser,
  modifyUser,
  newLoan,
  newWithdrawal,
  newContrib,
  memLoan,
  memContrib,
  changeContrib,
  memWith,
  password,
  approveMem,
} from "../controllers/member.js";

const router = Router();

router.get("", auth, isAdmin, allUsers);

router.get("/loan", auth, isMember, memLoan);

router.get("/contribution", auth, isMember, memContrib);

router.get("/withdrawal", auth, isMember, memWith);

router.post("", newUser);

router.post("/:id/approve", auth, isAdmin, approveMem);

router.post("/login", loginUser);

router.post("/password", auth, isMember, password);

router.post("/loan", auth, isMember, newLoan);

router.post("/contribution", auth, isMember, newContrib);

router.post("/withdrawal", auth, isMember, newWithdrawal);

router.patch("", auth, isMember, modifyUser);

router.patch("/contribution", auth, isMember, changeContrib);

export default router;
