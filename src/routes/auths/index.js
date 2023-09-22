import { Router } from "express";
import * as authController from "../../controllers/auth";
import { verifySignup } from "../../middlewares";
import responseHandler from "../../middlewares/handlers";

const router = Router();

router.post("/signup", [verifySignup.checkDuplicateUserNameOrEmail, verifySignup.checkRolesExist], responseHandler(authController.signup) );
router.post("/signin", responseHandler(authController.signin));

export default router;
