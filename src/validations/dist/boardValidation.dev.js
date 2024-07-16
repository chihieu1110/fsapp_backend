"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boardValidation = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _httpStatusCodes = require("http-status-codes");

var _ApiError = _interopRequireDefault(require("~/utils/ApiError"));

var _constants = require("~/utils/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createNew = function createNew(req, res, next) {
  var correctJoi;
  return regeneratorRuntime.async(function createNew$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          correctJoi = _joi["default"].object({
            title: _joi["default"].string().required().min(3).max(50).trim().strict().messages({
              "any.required": "Title is required",
              "string.empty": "Title is not allowed to be empty",
              "string.min": "Title min 3 chars",
              "string.max": "Title max 50 chars",
              "string.trim": "Title must not have leading or trailing whitespace"
            }),
            description: _joi["default"].string().required().min(3).max(256).trim().strict().messages({
              "any.required": "Description is required",
              "string.empty": "Description is not allowed to be empty",
              "string.min": "Description min 3 chars",
              "string.max": "Description max 50 chars",
              "string.trim": "Description must not have leading or trailing whitespace"
            }),
            type: _joi["default"].string().valid(_constants.BOARD_TYPES.PUBLIC, _constants.BOARD_TYPES.PRIVATE).required()
          });
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(correctJoi.validateAsync(req.body, {
            abortEarly: false
          }));

        case 4:
          //data validate
          next();
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          next(new _ApiError["default"](_httpStatusCodes.StatusCodes.UNPROCESSABLE_ENTITY, new Error(_context.t0).message));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]]);
};

var boardValidation = {
  createNew: createNew
};
exports.boardValidation = boardValidation;