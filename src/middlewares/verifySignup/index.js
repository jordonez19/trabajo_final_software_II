//validation
import { ROLES } from "../../models/roles";
import UserModel from "../../models/user";

export const checkDuplicateUserNameOrEmail = async (req, res, next) => {
  const user = await UserModel.findOne({ userName: req.body.userName });
  if (user) return res.status(400).json({ message: "The username already exists" });

  const email = await UserModel.findOne({ email: req.body.email });
  if (email) return res.status(400).json({ message: "The email already exists" });

  next();
};

export const checkRolesExist = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res
          .status(404)
          .json({ message: `Role ${req.body.roles[i]} doesn't exists ` });
      }
    }
  }
  next();
};
