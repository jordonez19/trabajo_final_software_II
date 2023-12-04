import app from "./app";
import { conection } from "./config";
import "./database/mongodb";
import "./database/mysql";

require("dotenv").config();

const port = conection.PORT;

app.listen(port, console.log("server is on port:", port));
