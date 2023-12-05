import { Router } from "express";
import * as saleController from "../../controllers/sale";

const router = Router();
router.get("/", saleController.getData);

router.get("/:id", saleController.getDataById);

router.post("/", saleController.postData);

router.put("/:id", saleController.updateDataById);

router.delete("/:id", saleController.deleteById);

export default router;
