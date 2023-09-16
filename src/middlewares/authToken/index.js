// middleware.js
import config from "../../config";
import Jwt from "jsonwebtoken";
import UserModel from "../../models/user";
import { checkRole } from "../../controllers/auth";

export const verifyToken = async (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }
  try {
    const decoded = Jwt.verify(token, config.SECRET);
    req.userId = decoded.id;
    const user = await UserModel.findById(req.userId, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const isModerator = async (req, res, next) => {
  checkRole(req, res, next, "moderator");
};

export const isAdmin = async (req, res, next) => {
  checkRole(req, res, next, "admin");
};
