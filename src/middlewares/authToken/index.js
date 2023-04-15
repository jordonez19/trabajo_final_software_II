//authorization
import config from "../../config";
import Jwt from "jsonwebtoken";
import UserModel from "../../models/user";
import RoleModel from "../../models/roles";
//-------------------------------------------------------------
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["access-token"]; //pedimos el token

    if (!token) return res.status(403).json({ message: "no token provided" });

    const decoded = Jwt.verify(token, config.SECRET); //decoded.id me da el id a reconocer
    req.userId = decoded.id;
    const user = await UserModel.findById(req.userId, { password: 0 }); // me encuentra el user y me lo devuelve

    if (!user) return res.status(404).json({ message: "no user found" });

    next();
  } catch (error) {
    return res.status(404).json({ message: "Unauthorized" });
  }
};
//-------------------------------------------------------------
export const isModerator = async (req, res, next) => {
  const user = await UserModel.findById(req.userId);
  const roles = await RoleModel.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") {
      next();
      return;
    }
  }
  res.status(403).json({ message: "Require moderator role" });
};
//-------------------------------------------------------------
export const isAdmin = async (req, res, next) => {
  const user = await UserModel.findById(req.userId);
  const roles = await RoleModel.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }
  res.status(403).json({ message: "Require admin role" });
};
