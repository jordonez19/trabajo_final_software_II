import { model, Schema } from "mongoose";

const productsSchema = new Schema(
  {
    name: {
      type: String,
    },
    category: {
      type: String,
    },
    price: {
      type: Number,
    },
    imageURL: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Product", productsSchema);
