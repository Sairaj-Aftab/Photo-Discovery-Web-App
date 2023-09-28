import multer from "multer";

// Initialization Multer for File Uploading
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

export const uploadPhotos = multer({ storage: storage }).array("photos", 10);
export const uploadProCovImg = multer({ storage: storage }).fields([
  { name: "avatar", maxCount: 1 },
  { name: "cover_photo", maxCount: 1 },
]);
