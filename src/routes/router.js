import productsRoutes from "./product";
import authRoutes from "./auths";
import usersRoutes from "./user";
import mailtoRoutes from "./mailto";
import imagesBanner from "./imagesBanner";

export default function (app) {
  app.use("/api/products", productsRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/users", usersRoutes);
  app.use("/api/mailto", mailtoRoutes);
  app.use("/api/imagesbanner", imagesBanner);
}
