"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _product = _interopRequireDefault(require("./product"));
var _auths = _interopRequireDefault(require("./auths"));
var _user = _interopRequireDefault(require("./user"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _default(app) {
  app.use("/api/products", _product["default"]);
  app.use("/api/auth", _auths["default"]);
  app.use("/api/users", _user["default"]);
}