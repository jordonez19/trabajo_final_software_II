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

router.get("/", responseHandler(imagesBanner.getAllImages));

router.get("/:id", responseHandler(imagesBanner.getImageById));

router.post(
  "/",
  upload.single("image"),
  responseHandler(imagesBanner.createImage)
);

router.post(
  "/s3",
  upload.single("image"),
  responseHandler(imagesBanner.createImageS3)
);

router.delete("/:id", responseHandler(imagesBanner.deleteImage));

export default router;

/* 

// Configura la carpeta de destino local
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./image"); // Reemplaza "carpeta-local" con la ruta de la carpeta local donde deseas guardar los archivos.
  },
  filename: function (req, file, cb) {
    // Genera un nombre de archivo único (puedes personalizar esto según tus necesidades)
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});


*/
