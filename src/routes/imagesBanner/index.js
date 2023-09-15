import { Router } from "express";
import * as imagesBanner from "../../controllers/imagesBanner";
import { authToken } from "../../middlewares";
import multer from "multer";

const router = Router();
const storage = multer.memoryStorage({
  limits: { fileSize: 10 * 1024 * 1024 },
});
const upload = multer({ storage });

router.get("/", /* [authToken.verifyToken], */ imagesBanner.getAllImages);

router.get("/:id", /* [authToken.verifyToken], */ imagesBanner.getImageById);

router.post(
  "/",
  /* [authToken.verifyToken], */
  upload.single("image"),
  imagesBanner.createImage
);

router.delete("/:id", /* [authToken.verifyToken], */ imagesBanner.deleteImage);

export default router;
