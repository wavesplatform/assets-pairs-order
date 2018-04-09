const WAVES_ID_TYPE = null;

export const compareUint8Arrays = (arr1, arr2) => {
  //  1    - arr1 bigger
  // -1    - arr2 bigger
  //  0    - equal
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] > arr2[i]) return 1;
    if (arr1[i] < arr2[i]) return -1;
  }
  return 0;
};
export const isPair = o =>
  Array.isArray(o) &&
  o.length === 2 &&
  o.every(id => typeof id === 'string' || id === WAVES_ID_TYPE);
export const isEmptyArray = a => Array.isArray(a) && a.length === 0;
