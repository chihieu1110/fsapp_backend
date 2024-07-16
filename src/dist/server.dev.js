"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _mongodb = require("~/config/mongodb");

var _asyncExitHook = _interopRequireDefault(require("async-exit-hook"));

var _environment = require("./config/environment");

var _v = require("./routes/v1");

var _errorHandlingMiddleware = require("./middlewares/errorHandlingMiddleware");

var _cors2 = require("./config/cors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var START_SERVER = function START_SERVER() {
  var app = (0, _express["default"])(); //xu ly cors

  app.use((0, _cors["default"])(_cors2.corsOptions));
  app.use(_express["default"].json());
  app.use('/v1', _v.APIs_V1);
  app.use(_errorHandlingMiddleware.errorHandlingMiddleware);
  app.listen(_environment.env.APP_PORT, _environment.env.APP_HOST, function () {
    console.log("Hi ".concat(_environment.env.AUTHOR, ",Server is running at http://").concat(_environment.env.APP_HOST, ":").concat(_environment.env.APP_PORT));
  });
  (0, _asyncExitHook["default"])(function () {
    console.log("closing db");
    (0, _mongodb.CLOSE_DB)();
    console.log("closed db");
  });
};

(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _mongodb.CONNECT_DB)());

        case 3:
          START_SERVER();
          _context.next = 10;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.error("Error starting the server", _context.t0);
          process.exit(0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
})(); // CONNECT_DB()
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .then(START_SERVER())
//   .catch((error) => {
//     console.error("Error starting the server", error);
//     process.exit(0);
//   });