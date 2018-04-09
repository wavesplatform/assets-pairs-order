import Base58 from 'base-58';
import mainnetRawData from './mainnet.json';

const mainnetData = mainnetRawData.map(d => d.id);
const WAVES_ID_TYPE = null;
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
}; // Logic here
const createPair = (id1, id2) => [id1, id2];
const isPair = o =>
  Array.isArray(o) &&
  o.length === 2 &&
  o.every(id => typeof id === 'string' || typeof id === WAVES_ID_TYPE);
const isEmptyArray = a => Array.isArray(a) && a.length === 0;
export default main;

// 1    - arr1 bigger
// -1   - arr2 bigger
// 0    - equal
export const compareUint8Arrays = (arr1, arr2) => {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] > arr2[i]) return 1;
    if (arr1[i] < arr2[i]) return -1;
  }
  return 0;
};
