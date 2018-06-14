import { Vector, Box, Circle } from 'sat';
import isInBounds from './isInBounds';

describe('isInBounds', () => {
  describe('Circle', () => {
    test('is in bounds', () => {
      expect(isInBounds(30, 30,
        new Circle(new Vector(10, 10), 5))).toBe(true);
    });

    test('is not in bounds', () => {
      expect(isInBounds(30, 30,
        new Circle(new Vector(10, 0), 5))).toBe(false);
      expect(isInBounds(30, 30,
        new Circle(new Vector(30, 5), 5))).toBe(false);
      expect(isInBounds(30, 30,
        new Circle(new Vector(25, 30), 5))).toBe(false);
      expect(isInBounds(30, 30,
        new Circle(new Vector(0, 25), 5))).toBe(false);
    });
  });

  describe('Box', () => {
    test('is in bounds', () => {
      expect(isInBounds(30, 30,
        new Box(new Vector(0, 0), 5))).toBe(true);
    });

    test('is not in bounds', () => {
      expect(isInBounds(30, 30,
        new Box(new Vector(0, -1), 10, 10))).toBe(false);
      expect(isInBounds(30, 30,
        new Box(new Vector(31, 0), 10, 10))).toBe(false);
      expect(isInBounds(30, 30,
        new Box(new Vector(20, 31), 10, 10))).toBe(false);
      expect(isInBounds(30, 30,
        new Box(new Vector(-1, 20), 10, 10))).toBe(false);
    });
  });
});
