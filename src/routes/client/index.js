import { Router } from "express";
import * as clientController from "../../controllers/client";

const router = Router();
router.get("/", clientController.getData);

router.get("/:id", clientController.getDataById);

router.post("/", clientController.postData);

router.put("/:id", clientController.updateDataById);

router.delete("/:id", clientController.deleteById);

export default router;
