import routes from "./routes/router";
import pkj from "../package.json";
import { createRoles } from "./utils/initialSetup";

const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

createRoles();
app.use(express.json({ limit: "10mb" }));
app.use(morgan("tiny"));
app.use(cors());
app.set("pkj", pkj);

app.get("/", (req, res) => {
  res.json({
    name: app.get("pkj").name,
    author: app.get("pkj").author,
    version: app.get("pkj").version,
    description: app.get("pkj").description,
    routes: [
      "http://localhost:3002/api/products/",
      "http://localhost:3002/api/auth/signup",
      "http://localhost:3002/api/auth/signin",
      "http://localhost:3002/api/auth/resetpassword",
      "http://localhost:3002/api/users/",
      "http://localhost:3002/api/mailto/",
      "http://localhost:3002/api/imagesbanner",
      "http://localhost:3002/api/",
    ],
  });
});

routes(app);
export default app;

