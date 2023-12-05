import { Router } from "express";
import * as providerController from "../../controllers/provider";

const router = Router();
router.get("/", providerController.getData);

router.get("/:id", providerController.getDataById);

router.post("/", providerController.postData);

router.put("/:id", providerController.updateDataById);

router.delete("/:id", providerController.deleteById);

export default router;
