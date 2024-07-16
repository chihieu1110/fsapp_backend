"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapOrder = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var mapOrder = function mapOrder(originalArray, orderArray, key) {
  if (!originalArray || !orderArray || !key) return [];

  var clonedArray = _toConsumableArray(originalArray);

  var orderedArray = clonedArray.sort(function (a, b) {
    return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]);
  });
  return orderedArray;
};

exports.mapOrder = mapOrder;