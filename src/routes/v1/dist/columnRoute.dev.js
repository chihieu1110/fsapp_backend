"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columnRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _columnController = require("~/controllers/columnController");

var _columnValidation = require("~/validations/columnValidation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Router = _express["default"].Router();

Router.route("/").post(_columnValidation.columnValidation.createNew, _columnController.columnController.createNew);
var columnRoutes = Router;
exports.columnRoutes = columnRoutes;