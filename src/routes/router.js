import productsRoutes from "./product";
import authRoutes from "./auths";
import usersRoutes from "./user";
import mailtoRoutes from "./mailto";

export default function (app) {
  app.use("/api/products", productsRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/users", usersRoutes);
  app.use("/api/mailto", mailtoRoutes);
}
