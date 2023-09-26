import { Router } from "express";
import * as imagesBanner from "../../controllers/imagesBanner";
import { authToken } from "../../middlewares";
import multer from "multer";
import responseHandler from "../../middlewares/handlers";

const router = Router();
const storage = multer.memoryStorage({
  limits: { fileSize: 50 * 1024 * 1024 },
});

const upload = multer({ storage });
//get all
router.get("/s3", responseHandler(imagesBanner.getFiles));
//id
router.get("/s3/:etag", responseHandler(imagesBanner.getFile));
//url
router.get("/s3/url/:etag", responseHandler(imagesBanner.getFileUrl));
//download
router.get("/downloads3/:etag", responseHandler(imagesBanner.downloadFile));
//upload img
router.post("/s3", upload.single("image"), responseHandler(imagesBanner.uploadFile));

//delete img
//router.delete("/:id", responseHandler(imagesBanner.deleteImage));

export default router;
