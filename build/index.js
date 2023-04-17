"use strict";

var _app = _interopRequireDefault(require("./app"));
require("./database/mongodb");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
require("dotenv").config();
var port = process.env.PORT;
_app["default"].listen(port, console.log("server is on port:", port));