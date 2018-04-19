import orderPairs from '../';
import { compareUint8Arrays } from '../utils';
import { equal } from 'assert';

describe('OrderPairs utility', () => {
  /**
   * Simple tests for proof-of-existence
   */
  it('is function', () => {
    expect(typeof orderPairs).toBe('function');
  });
  it('is callable without arguments', () => {
    expect(() => orderPairs()).not.toThrow();
  });
  it('has both default and named exports', () => {
    expect(orderPairs).toBeDefined();
    expect(compareUint8Arrays).toBeDefined();
  });

  /**
   * Arguments handling
   */
  it('accepts ([[string, string]])', () => {
    expect(() =>
      orderPairs([
        [
          'CrztSP3dRxLaXq4odFyDQ3w1nuRmqPZhFW6ib7JMo6Vt',
          'CrztSP3dRxLaXq4odFyDQ3w1nuRmqPZhFW6ib7JMo6Vt',
        ],
      ])
    ).not.toThrow();
  });
  it('accepts ([string, string])', () => {
    expect(() =>
      orderPairs([
        'FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA',
        'DNhP2zAH5HM1kdUSmxcBqs8RP4vvUgRFc1YgAKkfPmPD',
      ])
    ).not.toThrow();
  });
  it('accepts ([string, string], [string, string])', () => {
    expect(() =>
      orderPairs(
        [
          'FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA',
          'DNhP2zAH5HM1kdUSmxcBqs8RP4vvUgRFc1YgAKkfPmPD',
        ],
        [
          'FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA',
          'DNhP2zAH5HM1kdUSmxcBqs8RP4vvUgRFc1YgAKkfPmPD',
        ]
      )
    ).not.toThrow();
  });
  it('accepts (string, string)', () => {
    expect(() =>
      orderPairs(
        'FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA',
        'DNhP2zAH5HM1kdUSmxcBqs8RP4vvUgRFc1YgAKkfPmPD'
      )
    ).not.toThrow();
    expect(
      orderPairs(
        'FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA',
        'DNhP2zAH5HM1kdUSmxcBqs8RP4vvUgRFc1YgAKkfPmPD'
      )[0]
    ).toHaveLength(2);
  });
  it('accepts ([])', () => {
    expect(() => orderPairs([])).not.toThrow();
    expect(orderPairs([])).toEqual([]);
  });
  it("doesn't accept other types", () => {
    expect(() => orderPairs(NaN, null)).toThrow();
    expect(() => orderPairs(1, 2)).toThrow();
    expect(() => orderPairs([1, 2])).toThrow();
    expect(() => orderPairs([[1, 2]])).toThrow();
  });

  /**
   * Business logic testing
   */
  it('orders [USD,EUR] in [EUR,USD]', () => {
    expect(
      orderPairs(
        'Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck',
        'Gtb1WRznfchDnTh37ezoDTJ4wcoKaRsKqKjJjy7nm2zU'
      )
    ).toEqual([
      [
        'Gtb1WRznfchDnTh37ezoDTJ4wcoKaRsKqKjJjy7nm2zU',
        'Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck',
      ],
    ]);
  });
  it('orders [EUR,USD] in [EUR,USD]', () => {
    expect(
      orderPairs(
        'Gtb1WRznfchDnTh37ezoDTJ4wcoKaRsKqKjJjy7nm2zU',
        'Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck'
      )
    ).toEqual([
      [
        'Gtb1WRznfchDnTh37ezoDTJ4wcoKaRsKqKjJjy7nm2zU',
        'Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck',
      ],
    ]);
  });
  it("orders [EUR,'FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA'] in [FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA, EUR]", () => {
    expect(
      orderPairs(
        'Gtb1WRznfchDnTh37ezoDTJ4wcoKaRsKqKjJjy7nm2zU',
        'FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA'
      )
    ).toEqual([
      [
        'FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA',
        'Gtb1WRznfchDnTh37ezoDTJ4wcoKaRsKqKjJjy7nm2zU',
      ],
    ]);
  });
  it("orders [FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA', EUR] in [FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA, EUR]", () => {
    expect(
      orderPairs(
        'FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA',
        'Gtb1WRznfchDnTh37ezoDTJ4wcoKaRsKqKjJjy7nm2zU'
      )
    ).toEqual([
      [
        'FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA',
        'Gtb1WRznfchDnTh37ezoDTJ4wcoKaRsKqKjJjy7nm2zU',
      ],
    ]);
  });
  it("orders ['FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA', 'DNhP2zAH5HM1kdUSmxcBqs8RP4vvUgRFc1YgAKkfPmPD'] in ['DNhP2zAH5HM1kdUSmxcBqs8RP4vvUgRFc1YgAKkfPmPD', 'FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA']", () => {
    expect(
      orderPairs(
        'FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA',
        'DNhP2zAH5HM1kdUSmxcBqs8RP4vvUgRFc1YgAKkfPmPD'
      )
    ).toEqual([
      [
        'DNhP2zAH5HM1kdUSmxcBqs8RP4vvUgRFc1YgAKkfPmPD',
        'FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA',
      ],
    ]);
  });
  it("orders ['DNhP2zAH5HM1kdUSmxcBqs8RP4vvUgRFc1YgAKkfPmPD', 'FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA'] in ['DNhP2zAH5HM1kdUSmxcBqs8RP4vvUgRFc1YgAKkfPmPD', 'FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA']", () => {
    expect(
      orderPairs(
        'DNhP2zAH5HM1kdUSmxcBqs8RP4vvUgRFc1YgAKkfPmPD',
        'FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA'
      )
    ).toEqual([
      [
        'DNhP2zAH5HM1kdUSmxcBqs8RP4vvUgRFc1YgAKkfPmPD',
        'FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA',
      ],
    ]);
  });
  it('orders [USD, WAVES] in [WAVES, USD]', () => {
    expect(
      orderPairs(['Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck', 'WAVES'])
    ).toEqual([['WAVES', 'Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck']]);
  });
  it('orders [WAVES, USD] in [WAVES, USD]', () => {
    expect(
      orderPairs(['WAVES', 'Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck'])
    ).toEqual([['WAVES', 'Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck']]);
  });
  it('works with custom predefinedList', () => {
    let prevList = orderPairs.predefinedList;
    orderPairs.predefinedList = ['1', '2'];
    expect(orderPairs(['2', '1'])).toEqual([['2', '1']]);
    orderPairs.predefinedList = prevList;
  });
});

describe('Comparing uint8 arrays', () => {
  it('works', () => {
    const equalPart = [
      112,
      184,
      171,
      25,
      60,
      42,
      134,
      130,
      136,
      181,
      26,
      247,
      132,
      43,
      173,
      195,
      46,
      234,
      144,
      49,
      135,
      237,
      146,
      30,
      213,
      228,
      116,
      28,
      245,
    ];
    const arr1 = new Uint32Array([222, 55, 176, ...equalPart]);
    const arr2 = new Uint32Array([222, 219, 25, ...equalPart]);
    const arr3 = new Uint32Array([222, 55, 25, ...equalPart]);
    const arr4 = new Uint32Array([222, 55, 176, ...equalPart]);
    expect(compareUint8Arrays(arr1, arr2)).toBe(true); // arr2 bigger than arr1
    expect(compareUint8Arrays(arr1, arr3)).toBe(false); // arr1 bigger than arr3
    expect(compareUint8Arrays(arr1, arr4)).toBe(false); // arr1 equals arr4
  });
});
