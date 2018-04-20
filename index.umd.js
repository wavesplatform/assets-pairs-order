(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var Base58 = require('bs58');
  var MAINNET_RAW_DATA = require('./mainnet.json');

  var _require = require('./utils'),
      compareUint8Arrays = _require.compareUint8Arrays,
      isPair = _require.isPair,
      isEmptyArray = _require.isEmptyArray;

  var MAINNET_DATA = MAINNET_RAW_DATA.map(function (d) {
    return d.id;
  });

  // Entry point of package
  // Check arguments and do the magic
  var main = function main() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!main.predefinedList || !Array.isArray(main.predefinedList)) throw new Error('Incorrect predefined assets list');
    if (main.predefinedList.length === 0) console.warn("You have empty predefined assets list. This is probably not, what you desired. Check 'predefinedList' property.");
    switch (true) {
      case args.length === 0 || isEmptyArray(args[0]):
        return [];
      case args.length === 2 && isPair(args):
        return orderPairs([[args[0], args[1]]]);
      case Array.isArray(args[0]) && isPair(args[0][0]):
        return orderPairs.apply(undefined, args);
      case args.every(function (a) {
        return isPair(a);
      }):
        return orderPairs([].concat(args));
      default:
        throw new Error('Incorrect arguments: ' + JSON.stringify(args));
    }
  };
  // By default predefinedList is mainNet data
  main.predefinedList = MAINNET_DATA;

  var orderPairs = function orderPairs(pairs) {
    return pairs.map(orderPair);
  };
  var orderPair = function orderPair(_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        first = _ref2[0],
        second = _ref2[1];

    var firstListIndex = main.predefinedList.indexOf(first);
    var secondListIndex = main.predefinedList.indexOf(second);
    var isFirstInList = Boolean(~firstListIndex);
    var isSecondInList = Boolean(~secondListIndex);
    switch (true) {
      case isFirstInList && isSecondInList:
        return firstListIndex > secondListIndex ? [first, second] : [second, first];
      case isFirstInList && !isSecondInList:
        return [second, first];
      case !isFirstInList && isSecondInList:
        return [first, second];
      default:
        return compareUint8Arrays(Base58.decode(first), Base58.decode(second)) ? [second, first] : [first, second];
    }
  };
  module.exports = main;

})));
