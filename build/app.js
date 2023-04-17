"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _router = _interopRequireDefault(require("./routes/router"));
var _package = _interopRequireDefault(require("../package.json"));
var _initialSetup = require("./libs/initialSetup");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var express = require("express");
var app = express();
var morgan = require("morgan");
var cors = require("cors");
(0, _initialSetup.createRoles)();
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.set("pkj", _package["default"]);
app.get("/", function (req, res) {
  res.json({
    name: app.get("pkj").name,
    author: app.get("pkj").author,
    version: app.get("pkj").version,
    description: app.get("pkj").description
  });
});
(0, _router["default"])(app);
var _default = app;
exports["default"] = _default;