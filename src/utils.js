const WAVES_ID_TYPE = null;

const compareUint8Arrays = (arr1, arr2) => {
  //  true    - arr1 bigger
  //  false    - arr2 bigger
  return arr1.toString('hex') > arr2.toString('hex');
};
const isPair = o =>
  Array.isArray(o) &&
  o.length === 2 &&
  o.every(id => typeof id === 'string' || id === WAVES_ID_TYPE);
const isEmptyArray = a => Array.isArray(a) && a.length === 0;

module.exports = {
  compareUint8Arrays,
  isPair,
  isEmptyArray,
};
