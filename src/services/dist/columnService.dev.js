"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columnService = void 0;

var _boardModel = require("~/models/boardModel");

var _columnModel = require("~/models/columnModel");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createNew = function createNew(reqBody) {
  var newColumn, createdColumn, getNewColumn;
  return regeneratorRuntime.async(function createNew$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          newColumn = _objectSpread({}, reqBody);
          _context.next = 4;
          return regeneratorRuntime.awrap(_columnModel.columnModel.createNew(newColumn));

        case 4:
          createdColumn = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(_columnModel.columnModel.findOneById(createdColumn.insertedId));

        case 7:
          getNewColumn = _context.sent;

          if (!getNewColumn) {
            _context.next = 12;
            break;
          }

          // xu ly data trc khi tra data ve
          getNewColumn.cards = []; // update columnsOrderIds in collection boards

          _context.next = 12;
          return regeneratorRuntime.awrap(_boardModel.boardModel.pushColumnOrderIds(getNewColumn));

        case 12:
          return _context.abrupt("return", getNewColumn);

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          throw _context.t0;

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

var columnService = {
  createNew: createNew
};
exports.columnService = columnService;