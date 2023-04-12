import productsRoutes from "./product";
import authRoutes from "./auths";

export default function (app) {
  app.use("/api/products", productsRoutes);
  app.use("/api/auth", authRoutes);
}
