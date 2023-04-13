import { Router } from "express";
import * as authController from "../../controllers/auth";
import { verifySignup } from "../../middlewares";

const router = Router();

router.post("/signup", [verifySignup.checkDuplicateUserNameOrEmail, verifySignup.checkRolesExist] ,authController.signup);
router.post("/signin", authController.signin);

export default router;
