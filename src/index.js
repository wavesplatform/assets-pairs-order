const Base58 = require('bs58');
const { curry } = require('ramda');
const MAINNET_RAW_DATA = require('./mainnet.json');
const { compareUint8Arrays, isPair, isEmptyArray } = require('./utils');
const MAINNET_DATA = MAINNET_RAW_DATA.map(d => d.id);

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
module.exports = curry(orderPair);
module.exports.MAINNET_DATA = MAINNET_DATA;
