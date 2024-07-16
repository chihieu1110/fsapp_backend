"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cardService = void 0;

var _cardModel = require("~/models/cardModel");

var _columnModel = require("~/models/columnModel");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createNew = function createNew(reqBody) {
  var newCard, createdCard, getNewCard;
  return regeneratorRuntime.async(function createNew$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          newCard = _objectSpread({}, reqBody);
          _context.next = 4;
          return regeneratorRuntime.awrap(_cardModel.cardModel.createNew(newCard));

        case 4:
          createdCard = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(_cardModel.cardModel.findOneById(createdCard.insertedId));

        case 7:
          getNewCard = _context.sent;

          if (!getNewCard) {
            _context.next = 11;
            break;
          }

          _context.next = 11;
          return regeneratorRuntime.awrap(_columnModel.columnModel.pushCardOrderIds(getNewCard));

        case 11:
          return _context.abrupt("return", getNewCard);

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          throw _context.t0;

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

var cardService = {
  createNew: createNew
};
exports.cardService = cardService;