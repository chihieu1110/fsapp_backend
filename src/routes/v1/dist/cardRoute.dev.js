"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cardRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _cardController = require("~/controllers/cardController");

var _cardValidation = require("~/validations/cardValidation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Router = _express["default"].Router();

Router.route("/").post(_cardValidation.cardValidation.createNew, _cardController.cardController.createNew);
var cardRoutes = Router;
exports.cardRoutes = cardRoutes;