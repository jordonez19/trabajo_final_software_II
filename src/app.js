import pkj from "../package.json";
const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(express.json());
app.use(morgan("tiny"));

app.set('pkj', pkj)

app.get("/", (req, res) => {
  res.json({
    name: app.get('pkj').name,
    author: app.get('pkj').author,
    version: app.get('pkj').version,
    description: app.get('pkj').description,
  });
});

export default app;
