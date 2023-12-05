import { Router } from "express";
import * as clientPhoneController from "../../controllers/clientPhone";

const router = Router();
router.get("/", clientPhoneController.getData);

router.get("/:id", clientPhoneController.getDataById);

router.post("/", clientPhoneController.postData);

router.put("/:id", clientPhoneController.updateDataById);

router.delete("/:id", clientPhoneController.deleteById);

export default router;
