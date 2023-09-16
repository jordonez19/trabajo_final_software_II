import { Router } from "express";
import * as usersController from "../../controllers/users";
import { authToken, verifySignup } from "../../middlewares";
import responseHandler from "../../middlewares/handlers";

const router = Router();

router.get(
  "/",
  authToken.verifyToken,
  responseHandler(usersController.getUsers)
);
 
router.post(
  "/",
  [authToken.verifyToken, authToken.isAdmin, verifySignup.checkRolesExist],
  responseHandler(usersController.createUser)
);

export default router;
