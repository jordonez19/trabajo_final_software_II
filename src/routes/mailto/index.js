import { Router } from "express";
import * as mailtoController from "../../controllers/mailto";
import { authToken } from "../../middlewares";
const router = Router();

router.post("/", mailtoController.sendMailTo);

export default router;

