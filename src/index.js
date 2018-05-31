const Base58 = require('bs58');
const { compareUint8Arrays, isPair, isEmptyArray } = require('./utils');
const MAINNET_RAW_DATA = require('./mainnet.json');
const MAINNET_DATA = MAINNET_RAW_DATA.map(x => x.id);
const TESTNET_RAW_DATA = require('./testnet.json');
const TESTNET_DATA = TESTNET_RAW_DATA.map(x => x.id);

const orderPair = (predefinedList, first, second) => {
  const firstListIndex = predefinedList.indexOf(first);
  const secondListIndex = predefinedList.indexOf(second);
  const isFirstInList = Boolean(~firstListIndex);
  const isSecondInList = Boolean(~secondListIndex);
  switch (true) {
    case isFirstInList && isSecondInList:
      return firstListIndex > secondListIndex
        ? [first, second]
        : [second, first];
    case isFirstInList && !isSecondInList:
      return [second, first];
    case !isFirstInList && isSecondInList:
      return [first, second];
    default:
      return compareUint8Arrays(Base58.decode(first), Base58.decode(second))
        ? [second, first]
        : [first, second];
  }
};

const curry = function(f) {
  var slice = Array.prototype.slice,
    self = f,
    totalargs = self.length,
    partial = function(args, fn) {
      return function() {
        return fn.apply({}, args.concat(slice.call(arguments)));
      };
    },
    fn = function() {
      var args = slice.call(arguments);
      return args.length < totalargs
        ? partial(args, fn)
        : self.apply({}, slice.apply(arguments, [0, totalargs]));
    };
  return fn;
};
module.exports.createOrderPair = curry(orderPair);
module.exports.MAINNET_DATA = MAINNET_DATA;
module.exports.TESTNET_DATA = TESTNET_DATA;
