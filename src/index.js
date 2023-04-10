import app from "./app";
import "./database/mongodb";

require("dotenv").config();

const port = process.env.PORT;

app.listen(port, console.log("server is on port:", port));
