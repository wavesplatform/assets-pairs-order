import orderPairs from '../';

describe('OrderPairs utility', () => {
  it('is function', () => {
    expect(typeof orderPairs).toBe('function');
  });
  it('is callable without arguments', () => {
    expect(() => orderPairs).not.toThrow();
  });
});
