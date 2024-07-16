"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cardValidation = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _httpStatusCodes = require("http-status-codes");

var _ApiError = _interopRequireDefault(require("~/utils/ApiError"));

var _validators = require("~/utils/validators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createNew = function createNew(req, res, next) {
  var correctJoi;
  return regeneratorRuntime.async(function createNew$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          correctJoi = _joi["default"].object({
            boardId: _joi["default"].string().required().pattern(_validators.OBJECT_ID_RULE).message(_validators.OBJECT_ID_RULE_MESSAGE),
            columnId: _joi["default"].string().required().pattern(_validators.OBJECT_ID_RULE).message(_validators.OBJECT_ID_RULE_MESSAGE),
            title: _joi["default"].string().required().min(3).max(50).trim().strict()
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

var cardValidation = {
  createNew: createNew
};
exports.cardValidation = cardValidation;