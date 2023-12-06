import authRoutes from "./auths";
import usersRoutes from "./user";
import mailtoRoutes from "./mailto";
import imagesBanner from "./imagesBanner";

import productsRoutes from "./product";
import categoryRoutes from "./category";
import clientRoutes from "./client";
import clientphoneRoutes from "./clientPhone";
import saleRoutes from "./sale";
import saleproductRoutes from "./saleProduct";
import providerRoutes from "./provider";

export default function (app) {
  app.use("/api/auth", authRoutes);
  app.use("/api/users", usersRoutes);
  app.use("/api/mailto", mailtoRoutes);
  app.use("/api/imagesbanner", imagesBanner);

  //app
  app.use("/api/product", productsRoutes);
  app.use("/api/category", categoryRoutes);
  app.use("/api/client", clientRoutes);
  app.use("/api/clientphone", clientphoneRoutes);
  app.use("/api/sale", saleRoutes);
  app.use("/api/provider", providerRoutes);
  app.use("/api/saleproduct", saleproductRoutes); 
}
