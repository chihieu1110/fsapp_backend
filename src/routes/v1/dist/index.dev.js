"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.APIs_V1 = void 0;

var _express = _interopRequireDefault(require("express"));

var _httpStatusCodes = require("http-status-codes");

var _boardRoute = require("~/routes/v1/boardRoute");

var _columnRoute = require("~/routes/v1/columnRoute");

var _cardRoute = require("~/routes/v1/cardRoute");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Router = _express["default"].Router();

Router.get("/status", function (req, res) {
  res.status(_httpStatusCodes.StatusCodes.OK).json({
    message: "APi v1 is ready to use"
  });
});
Router.use("/boards", _boardRoute.boardRoute);
Router.use("/columns", _columnRoute.columnRoutes);
Router.use("/cards", _cardRoute.cardRoutes);
var APIs_V1 = Router;
exports.APIs_V1 = APIs_V1;