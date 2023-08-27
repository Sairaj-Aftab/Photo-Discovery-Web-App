import express from "express";
import multer from "multer";
import path from "path";
import {
  activateAccountByCode,
  activateAccountByLink,
  editUser,
  logOut,
  logedIn,
  login,
  register,
} from "../controller/userController.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();
const __dirname = path.resolve();

// Initialization Multer for File Uploading
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/api/public/profilecover"));
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadProCovImg = multer({ storage: storage }).fields([
  { name: "avatar", maxCount: 1 },
  { name: "cover_photo", maxCount: 1 },
]);

router.post("/register", register);
router.post("/activate", activateAccountByCode);
router.post("/activate/:token", activateAccountByLink);
router.post("/login", login);
router.get("/logedIn", verifyToken, logedIn);
router.post("/logout", logOut);
router.put("/edit_user", verifyToken, uploadProCovImg, editUser);

export default router;
