"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boardRoute = void 0;

var _express = _interopRequireDefault(require("express"));

var _httpStatusCodes = require("http-status-codes");

var _boardController = require("~/controllers/boardController");

var _boardValidation = require("~/validations/boardValidation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Router = _express["default"].Router();

Router.route("/").get(function (req, res) {
  res.status(_httpStatusCodes.StatusCodes.OK).json({
    message: "GET!"
  });
}).post(_boardValidation.boardValidation.createNew, _boardController.boardController.createNew);
Router.route("/:id").get(_boardController.boardController.getDetails).put();
var boardRoute = Router;
exports.boardRoute = boardRoute;