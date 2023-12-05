import { Router } from "express";
import * as categoryController from "../../controllers/category";

const router = Router();
router.get("/", categoryController.getData);

router.get("/:id", categoryController.getDataById);

router.post("/", categoryController.postData);

router.put("/:id", categoryController.updateDataById);

router.delete("/:id", categoryController.deleteById);

export default router;
