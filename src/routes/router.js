import productsRoutes from "./product";
import authRoutes from "./auths";
import usersRoutes from "./user";

export default function (app) {
  app.use("/api/products", productsRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/users", usersRoutes);
}
