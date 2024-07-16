"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columnModel = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _mongodb = require("~/config/mongodb");

var _mongodb2 = require("mongodb");

var _validators = require("~/utils/validators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Define Collection (name & schema)
var COLUMN_COLLECTION_NAME = "columns";

var COLUMN_COLLECTION_SCHEMA = _joi["default"].object({
  boardId: _joi["default"].string().required().pattern(_validators.OBJECT_ID_RULE).message(_validators.OBJECT_ID_RULE_MESSAGE),
  title: _joi["default"].string().required().min(3).max(50).trim().strict(),
  cardOrderIds: _joi["default"].array().items(_joi["default"].string().pattern(_validators.OBJECT_ID_RULE).message(_validators.OBJECT_ID_RULE_MESSAGE))["default"]([]),
  createdAt: _joi["default"].date().timestamp("javascript")["default"](Date.now),
  updatedAt: _joi["default"].date().timestamp("javascript")["default"](null),
  _isDeleted: _joi["default"]["boolean"]()["default"](false)
});

var validateDataBeforeCreate = function validateDataBeforeCreate(data) {
  return regeneratorRuntime.async(function validateDataBeforeCreate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(COLUMN_COLLECTION_SCHEMA.validateAsync(data, {
            abortEarly: false
          }));

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

var createNew = function createNew(data) {
  var validData, newAddedColumn, createdModel;
  return regeneratorRuntime.async(function createNew$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(validateDataBeforeCreate(data));

        case 3:
          validData = _context2.sent;
          newAddedColumn = _objectSpread({}, validData, {
            boardId: new _mongodb2.ObjectId(String(validData.boardId))
          });
          _context2.next = 7;
          return regeneratorRuntime.awrap((0, _mongodb.GET_DB)().collection(COLUMN_COLLECTION_NAME).insertOne(newAddedColumn));

        case 7:
          createdModel = _context2.sent;
          return _context2.abrupt("return", createdModel);

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          throw new Error(_context2.t0);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

var findOneById = function findOneById(id) {
  var idTest, result;
  return regeneratorRuntime.async(function findOneById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          console.log(id);
          idTest = new _mongodb2.ObjectId(String(id));
          console.log(idTest);
          _context3.next = 6;
          return regeneratorRuntime.awrap((0, _mongodb.GET_DB)().collection(COLUMN_COLLECTION_NAME).findOne({
            _id: idTest
          }));

        case 6:
          result = _context3.sent;
          return _context3.abrupt("return", result);

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          throw new Error(_context3.t0);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; // day cardId vao cuoi cardOrderIds


var pushCardOrderIds = function pushCardOrderIds(card) {
  var boardIdTested, cardIdTested, result;
  return regeneratorRuntime.async(function pushCardOrderIds$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          boardIdTested = new _mongodb2.ObjectId(String(card.columnId));
          cardIdTested = new _mongodb2.ObjectId(String(card._id));
          _context4.next = 5;
          return regeneratorRuntime.awrap((0, _mongodb.GET_DB)().collection(COLUMN_COLLECTION_NAME).findOneAndUpdate({
            _id: boardIdTested
          }, {
            $push: {
              cardOrderIds: cardIdTested
            }
          }, {
            returnDocument: "after"
          }));

        case 5:
          result = _context4.sent;
          return _context4.abrupt("return", result.value);

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          throw new Error(_context4.t0);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

var columnModel = {
  COLUMN_COLLECTION_NAME: COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA: COLUMN_COLLECTION_SCHEMA,
  createNew: createNew,
  findOneById: findOneById,
  pushCardOrderIds: pushCardOrderIds
};
exports.columnModel = columnModel;