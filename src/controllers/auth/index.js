import config, { mailTo } from "../../config";
import UsersModel from "../../models/user";
import RolesModel from "../../models/roles";
import Jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const email = mailTo.email;
const pass = mailTo.pass;

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
  res.json({ token: token, user: newUser });
};

export const signin = async (req, res) => {
  const userFound = await UsersModel.findOne({
    email: req.body.email,
  }).populate("roles");

  if (!userFound) return res.status(400).json({ message: "user not found" });

  const matchPassword = await UsersModel.comparePassword(
    req.body.password,
    userFound.password
  );

  if (!matchPassword)
    return res.status(401).json({ token: null, message: "invalid password" });

  const token = Jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400,
  });

  res.json({ token: token, user: userFound });
};

//----------------------------------------------------------------------
export const checkRole = async (req, res, next, roleName) => {
  const user = await UsersModel.findById(req.userId);
  const roles = await RolesModel.find({ _id: { $in: user.roles } });

  if (roles.some((role) => role.name === roleName)) {
    next();
  } else {
    res.status(403).json({ message: `Require ${roleName} role` });
  }
};

//----------------------------------------------------------------------
//Password reset
//----------------------------------------------------------------------
// Function to send a password reset email
const sendPasswordResetEmail = async (user, resetToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: pass,
    },
  });

  const resetLink = `${config.APP_URL}/reset-password/${resetToken}`;
  const mailOptions = {
    from: email,
    to: user.email,
    subject: "Restablecer Contraseña",
    text: `Click en el siguiente link para restablecer tu contraseña: ${resetLink}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, Helvetica, sans-serif;
            text-align: center;
          }
          .container {
            margin-top: 20px;
          }
          .button {
            background-color: #007BFF;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Restablece tu Contraseña</h2>
          <p>Haz clic en el botón de abajo para restablecer tu contraseña:</p>
          <a class="button" href="${resetLink}">Restablecer Contraseña</a>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

//---------------------------------------------------------------
// Route to request a password reset
export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UsersModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const resetToken = Jwt.sign({ id: user._id }, config.SECRET, {
      expiresIn: "10m", // Set the token expiration time to 10 minutes
    });

    // Store the reset token and its expiration time in the user's document in the database
    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    // Send the password reset email with the reset token
    await sendPasswordResetEmail(user, resetToken);

    res.json({ message: "Password reset instructions sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//---------------------------------------------------------------
//---------------------------------------------------------------
// Route to handle password reset with token
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    // Find the user by the token's ID and check if the token is not expired
    const user = await UsersModel.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() }, // Check if the token is not expired
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    // Update the user's password
    user.password = await UsersModel.encryptPassword(newPassword);
    user.resetToken = null; // Remove the reset token
    user.resetTokenExpires = null; // Remove the reset token expiration time
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid reset token" });
  }
};
