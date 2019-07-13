import { insertSecondHalf } from './session';

describe('the session utility functions', () => {
  describe('the insertSecondHalf function', () => {
    it('should insert items somewhere in the second half of the array', () => {
      Array.apply(null, { length: 20 } as number[]).forEach(() => {
        expect(
          insertSecondHalf([0, 1, 2, 3, 4, 5, 6, 7], 42).indexOf(42),
        ).toBeGreaterThan(3);
      });
    });

    it('should insert as the second item in an array of length 1', () => {
      Array.apply(null, { length: 20 } as number[]).forEach(() => {
        expect(
          insertSecondHalf([1], 42).indexOf(42),
        ).toEqual(1);
      });
    });

    it('should insert as the first item in an array of length 0', () => {
      const l = insertSecondHalf([], 42);

      expect(
        l.indexOf(42),
      ).toEqual(0);

      expect(l).toEqual([42]);
    });
  });
});
