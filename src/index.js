import Base58 from 'bs58';
import MAINNET_RAW_DATA from './mainnet.json';
import { compareUint8Arrays, isPair, isEmptyArray } from './utils';
const MAINNET_DATA = MAINNET_RAW_DATA.map(d => d.id);

// Entry point of package
// Check arguments and do the magic
const main = (...args) => {
  if (!main.predefinedList || !Array.isArray(main.predefinedList))
    throw new Error('Incorrect predefined assets list');
  if (main.predefinedList.length === 0)
    console.warn(
      "You have empty predefined assets list. This is probably not, what you desired. Check 'predefinedList' property."
    );
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
// By default predefinedList is mainNet data
main.predefinedList = MAINNET_DATA;

const orderPairs = pairs => pairs.map(orderPair);
const orderPair = ([first, second]) => {
  const firstListIndex = main.predefinedList.indexOf(first);
  const secondListIndex = main.predefinedList.indexOf(second);
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
      return compareUint8Arrays(Base58.decode(first), Base58.decode(second))
        ? [first, second]
        : [second, first];
  }
};
export default main;
