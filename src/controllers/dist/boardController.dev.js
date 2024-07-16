"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boardController = void 0;

var _httpStatusCodes = require("http-status-codes");

var _boardService = require("~/services/boardService");

var createNew = function createNew(req, res, next) {
  var createdBoard;
  return regeneratorRuntime.async(function createNew$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_boardService.boardService.createNew(req.body));

        case 3:
          createdBoard = _context.sent;
          res.status(_httpStatusCodes.StatusCodes.CREATED).json(createdBoard);
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

var getDetails = function getDetails(req, res, next) {
  var boardId, board;
  return regeneratorRuntime.async(function getDetails$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          boardId = req.params.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_boardService.boardService.getDetails(boardId));

        case 4:
          board = _context2.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json(board);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var boardController = {
  createNew: createNew,
  getDetails: getDetails
};
exports.boardController = boardController;