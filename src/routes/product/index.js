import { Router } from "express";
import * as productsController from "../../controllers/products";
import { authToken } from "../../middlewares";

const router = Router();
router.get("/", [authToken.verifyToken], productsController.getProducts);

router.get("/:id", [authToken.verifyToken], productsController.getProductById);

router.post(
  "/",
  [authToken.verifyToken, authToken.isModerator],
  productsController.createProduct
);

router.put(
  "/:id",
  [authToken.verifyToken, authToken.isAdmin],
  productsController.updateProductById
);

router.delete(
  "/:id",
  [authToken.verifyToken, authToken.isAdmin],
  productsController.deleteProductById
);

export default router;
