import express from "express";
import {
  activateAccountByCode,
  activateAccountByLink,
  logOut,
  logedIn,
  login,
  register,
} from "../controller/userController.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/register", register);
router.post("/activate", activateAccountByCode);
router.post("/activate/:token", activateAccountByLink);
router.post("/login", login);
router.get("/logedIn", verifyToken, logedIn);
router.post("/logout", logOut);

export default router;
