"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columnController = void 0;

var _httpStatusCodes = require("http-status-codes");

var _columnService = require("~/services/columnService");

var createNew = function createNew(req, res, next) {
  var createdColumn;
  return regeneratorRuntime.async(function createNew$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_columnService.columnService.createNew(req.body));

        case 3:
          createdColumn = _context.sent;
          res.status(_httpStatusCodes.StatusCodes.CREATED).json(createdColumn);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var columnController = {
  createNew: createNew
};
exports.columnController = columnController;