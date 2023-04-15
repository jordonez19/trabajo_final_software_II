import { Router } from "express";
import * as usersController from "../../controllers/users";
import { authToken, verifySignup } from "../../middlewares";
const router = Router();

router.post("/", 
  [authToken.verifyToken, authToken.isAdmin, verifySignup.checkRolesExist], usersController.createUser 
);

export default router;
