import mongoose from "mongoose";

const imagesBannerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("ImageBanner", imagesBannerSchema);
