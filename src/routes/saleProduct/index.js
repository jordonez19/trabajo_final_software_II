import { Router } from "express";
import * as saleProduct from "../../controllers/saleProduct";

const router = Router();
router.get("/", saleProduct.getData);

router.get("/:id", saleProduct.getDataById);

router.post("/", saleProduct.postData);

router.put("/:id", saleProduct.updateDataById);

router.delete("/:id", saleProduct.deleteById);

export default router;
