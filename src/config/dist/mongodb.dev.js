"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET_DB = exports.CLOSE_DB = exports.CONNECT_DB = void 0;

var _mongodb = require("mongodb");

var _environment = require("~/config/environment");

// USER = chihieu
// PASS = "L1oI5zQsirs3Onvw"
var DBInstance = null; // de connect toi MDB

var DBClient = new _mongodb.MongoClient(_environment.env.MONGODB_URI, {
  serverApi: {
    version: _mongodb.ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

var CONNECT_DB = function CONNECT_DB() {
  return regeneratorRuntime.async(function CONNECT_DB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(DBClient.connect());

        case 2:
          DBInstance = DBClient.db(_environment.env.DATABASE_NAME);
          console.log("Connected to DB");

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.CONNECT_DB = CONNECT_DB;

var CLOSE_DB = function CLOSE_DB() {
  return regeneratorRuntime.async(function CLOSE_DB$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log("Code chay vao day");
          _context2.next = 3;
          return regeneratorRuntime.awrap(DBClient.close());

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.CLOSE_DB = CLOSE_DB;

var GET_DB = function GET_DB() {
  if (!DBInstance) throw new Error("DB not connected");
  return DBInstance;
};

exports.GET_DB = GET_DB;