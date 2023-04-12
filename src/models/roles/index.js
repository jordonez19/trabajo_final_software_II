import { model, Schema } from "mongoose";

const roleSchema = new Schema(
  {
    name: { type: String },
  },
  { versionKey: false }
);
export default model("Roles", roleSchema);
