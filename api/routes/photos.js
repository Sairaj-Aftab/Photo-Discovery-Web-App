import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  createPost,
  deletePhotoById,
  getAllPhotos,
  searchPhotos,
} from "../controller/photosController.js";
import { uploadPhotos } from "../utility/multer.js";
const router = express.Router();

router.post("/create_post", verifyToken, uploadPhotos, createPost);
router.get("/", getAllPhotos);
router.post("/search", searchPhotos);
router.delete("/:id", verifyToken, deletePhotoById);

export default router;
