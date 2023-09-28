import express from "express";
import {
  activateAccountByCode,
  activateAccountByLink,
  editUser,
  getSingleUser,
  logOut,
  logedIn,
  login,
  register,
} from "../controller/userController.js";
import verifyToken from "../middleware/verifyToken.js";
import { uploadProCovImg } from "../utility/multer.js";
const router = express.Router();

router.post("/register", register);
router.post("/activate", activateAccountByCode);
router.post("/activate/:token", activateAccountByLink);
router.post("/login", login);
router.get("/logedIn", verifyToken, logedIn);
router.post("/logout", logOut);
router.put("/edit_user", verifyToken, uploadProCovImg, editUser);
router.get("/:userName", getSingleUser);

export default router;
