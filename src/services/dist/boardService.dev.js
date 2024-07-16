"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boardService = void 0;

var _httpStatusCodes = require("http-status-codes");

var _boardModel = require("~/models/boardModel");

var _ApiError = _interopRequireDefault(require("~/utils/ApiError"));

var _formatters = require("~/utils/formatters");

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createNew = function createNew(reqBody) {
  var newBoard, createdBoard, getNewBoard;
  return regeneratorRuntime.async(function createNew$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          newBoard = _objectSpread({}, reqBody, {
            slug: (0, _formatters.slugify)(reqBody.title)
          });
          _context.next = 4;
          return regeneratorRuntime.awrap(_boardModel.boardModel.createNew(newBoard));

        case 4:
          createdBoard = _context.sent;
          console.log(createdBoard);
          _context.next = 8;
          return regeneratorRuntime.awrap(_boardModel.boardModel.findOneById(createdBoard.insertedId));

        case 8:
          getNewBoard = _context.sent;
          console.log(getNewBoard);
          return _context.abrupt("return", getNewBoard);

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          throw _context.t0;

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

var getDetails = function getDetails(boardId) {
  var board, responseBoard;
  return regeneratorRuntime.async(function getDetails$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          console.log("day ne :3", boardId);
          _context2.next = 4;
          return regeneratorRuntime.awrap(_boardModel.boardModel.getDetails(boardId));

        case 4:
          board = _context2.sent;

          if (board) {
            _context2.next = 7;
            break;
          }

          throw new _ApiError["default"](_httpStatusCodes.StatusCodes.NOT_FOUND, "Board Not Found");

        case 7:
          responseBoard = (0, _lodash.cloneDeep)(board); // Dua card ve column cua no

          responseBoard.columns.forEach(function (column) {
            column.cards = responseBoard.cards.filter(function (card) {
              return card.columnId.toString() === column._id.toString();
            });
          });
          delete responseBoard.cards;
          return _context2.abrupt("return", responseBoard);

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          throw _context2.t0;

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

var boardService = {
  createNew: createNew,
  getDetails: getDetails
};
exports.boardService = boardService;