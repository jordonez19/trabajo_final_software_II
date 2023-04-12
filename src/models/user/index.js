import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        ref: "Roles",
        type: Schema.Types.ObjectId,
      },
    ],
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password, salt);
  return passwordHashed
};

UserSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
};

export default model("Users", UserSchema);

