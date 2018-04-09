import Base58 from 'base58';
import mainnetRawData from './mainnet.json';
import { compareUint8Arrays, isPair, isEmptyArray } from './utils';
const mainnetData = mainnetRawData.map(d => d.id);

// Entry point of package
// Check arguments and do the magic
const main = (...args) => {
  switch (true) {
    case args.length === 0 || isEmptyArray(args[0]):
      return [];
    case args.length === 2 && isPair(args):
      return orderPairs([[args[0], args[1]]]);
    case Array.isArray(args[0]) && isPair(args[0][0]):
      return orderPairs(...args);
    case args.every(a => isPair(a)):
      return orderPairs([...args]);
    default:
      throw new Error(`Incorrect arguments: ${JSON.stringify(args)}`);
  }
};

const orderPairs = pairs => pairs.map(orderPair);
const orderPair = ([first, second]) => {
  const firstListIndex = mainnetData.indexOf(first);
  const secondListIndex = mainnetData.indexOf(second);
  const isFirstInList = Boolean(~firstListIndex);
  const isSecondInList = Boolean(~secondListIndex);
  switch (true) {
    case isFirstInList && isSecondInList:
      return firstListIndex < secondListIndex
        ? [first, second]
        : [second, first];
    case isFirstInList && !isSecondInList:
      return [first, second];
    case !isFirstInList && isSecondInList:
      return [second, first];
    default:
      return compareUint8Arrays(Base58.decode(first), Base58.decode(second)) ===
        1
        ? [first, second]
        : [second, first];
  }
};

export default main;
