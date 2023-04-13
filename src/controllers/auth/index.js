//---------------------------------------------------------------
import config from "../../config";
import UsersModel from "../../models/user";
import RolesModel from "../../models/roles";
import Jwt from "jsonwebtoken";
//---------------------------------------------------------------
export const signup = async (req, res) => {
  const { userName, email, password, roles } = req.body;

  const newUser = new UsersModel({
    userName,
    email,
    password: await UsersModel.encryptPassword(password),
  });

  if (roles) {
    const foundRoles = await RolesModel.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await RolesModel.findOne({ name: "user" });
    newUser.roles = [role._id];
  }

  const savedUser = await newUser.save();

  const token = Jwt.sign({ id: savedUser }, config.SECRET, {
    expiresIn: 86400,
  });

  res.json({ token });
};
//---------------------------------------------------------------
export const signin = async (req, res) => {
  const userFound = await UsersModel.findOne({
    email: req.body.email,
  }).populate("roles");

  if (!userFound) return res.status(400).json({ message: "user not found" });
  console.log(userFound);

  const matchPassword = await UsersModel.comparePassword(
    req.body.password,
    userFound.password
  );

  if (!matchPassword)
    return res.status(401).json({ token: null, message: "invalid password" });

  const token = Jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400,
  });

  res.json({ token: token });
};
