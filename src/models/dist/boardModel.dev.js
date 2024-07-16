"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boardModel = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _mongodb = require("mongodb");

var _mongodb2 = require("~/config/mongodb");

var _constants = require("~/utils/constants");

var _validators = require("~/utils/validators");

var _columnModel = require("~/models/columnModel");

var _cardModel = require("./cardModel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BOARD_COLLECTION_NAME = "boards";

var BOARD_SCHEMA = _joi["default"].object({
  title: _joi["default"].string().required().min(3).max(50).trim().strict(),
  slug: _joi["default"].string().required().min(3).max(256).trim().strict(),
  description: _joi["default"].string().required().min(3).max(256).trim().strict(),
  type: _joi["default"].string().valid(_constants.BOARD_TYPES.PUBLIC, _constants.BOARD_TYPES.PRIVATE).required(),
  columnOrderIds: _joi["default"].array().items(_joi["default"].string().pattern(_validators.OBJECT_ID_RULE).message(_validators.OBJECT_ID_RULE_MESSAGE))["default"]([]),
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
          return regeneratorRuntime.awrap(BOARD_SCHEMA.validateAsync(data, {
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
  var validData, createdBoard;
  return regeneratorRuntime.async(function createNew$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(validateDataBeforeCreate(data));

        case 3:
          validData = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap((0, _mongodb2.GET_DB)().collection(BOARD_COLLECTION_NAME).insertOne(validData));

        case 6:
          createdBoard = _context2.sent;
          return _context2.abrupt("return", createdBoard);

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          throw new Error(_context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

var findOneById = function findOneById(id) {
  var idTest, result;
  return regeneratorRuntime.async(function findOneById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          console.log(id);
          idTest = new _mongodb.ObjectId(String(id));
          console.log(idTest);
          _context3.next = 6;
          return regeneratorRuntime.awrap((0, _mongodb2.GET_DB)().collection(BOARD_COLLECTION_NAME).findOne({
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
};

var getDetails = function getDetails(id) {
  var idTest, result;
  return regeneratorRuntime.async(function getDetails$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          console.log(id);
          idTest = new _mongodb.ObjectId(String(id));
          console.log(idTest);
          _context4.next = 6;
          return regeneratorRuntime.awrap((0, _mongodb2.GET_DB)().collection(BOARD_COLLECTION_NAME).aggregate([{
            $match: {
              _id: idTest,
              _isDeleted: false
            }
          }, {
            $lookup: {
              from: _columnModel.columnModel.COLUMN_COLLECTION_NAME,
              localField: "_id",
              foreignField: "boardId",
              as: "columns"
            }
          }, {
            $lookup: {
              from: _cardModel.cardModel.CARD_COLLECTION_NAME,
              localField: "_id",
              foreignField: "boardId",
              as: "cards"
            }
          }]).toArray());

        case 6:
          result = _context4.sent;
          return _context4.abrupt("return", result[0] || null);

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          throw new Error(_context4.t0);

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; // day columnId vao cuoi columnOrderIds


var pushColumnOrderIds = function pushColumnOrderIds(column) {
  var boardIdTested, columnIdTested, result;
  return regeneratorRuntime.async(function pushColumnOrderIds$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          boardIdTested = new _mongodb.ObjectId(String(column.boardId));
          columnIdTested = new _mongodb.ObjectId(String(column._id));
          _context5.next = 5;
          return regeneratorRuntime.awrap((0, _mongodb2.GET_DB)().collection(BOARD_COLLECTION_NAME).findOneAndUpdate({
            _id: boardIdTested
          }, {
            $push: {
              columnOrderIds: columnIdTested
            }
          }, {
            returnDocument: "after"
          }));

        case 5:
          result = _context5.sent;
          return _context5.abrupt("return", result.value);

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          throw new Error(_context5.t0);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

var boardModel = {
  BOARD_COLLECTION_NAME: BOARD_COLLECTION_NAME,
  BOARD_SCHEMA: BOARD_SCHEMA,
  createNew: createNew,
  findOneById: findOneById,
  getDetails: getDetails,
  pushColumnOrderIds: pushColumnOrderIds
};
exports.boardModel = boardModel;