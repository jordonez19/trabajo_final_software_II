import { Router } from "express";
import * as productsController from "../../controllers/product";
import { authToken } from "../../middlewares";

const router = Router();
router.get("/", productsController.getData);

router.get("/:id", productsController.getDataById);

router.post("/", productsController.postData);

router.put("/:id", productsController.updateDataById);

router.delete("/:id", productsController.deleteById);

export default router;

//[authToken.verifyToken],
//[authToken.verifyToken],
//[authToken.verifyToken, authToken.isModerator],
//[authToken.verifyToken, authToken.isAdmin],
//[authToken.verifyToken, authToken.isAdmin],
