import { Box, Circle, Vector } from 'sat';
import hasCollided from './hasCollided';

describe('hasCollided', () => {
  describe('Circle to Circle', () => {
    test('collision', () => {
      const a = new Circle(new Vector(0, 0), 20);
      const b = new Circle(new Vector(10, 10), 20);

      expect(hasCollided(a, b)).toBe(true);
    });

    test('no collision', () => {
      const a = new Circle(new Vector(0, 0), 5);
      const b = new Circle(new Vector(10, 10), 5);

      expect(hasCollided(a, b)).toBe(false);
    });
  });

  describe('Circle to Rectangle', () => {
    test('collision', () => {
      const a = new Circle(new Vector(0, 0), 20);
      const b = new Box(new Vector(10, 10), 20, 20);

      expect(hasCollided(a, b)).toBe(true);
    });

    test('no collision', () => {
      const a = new Circle(new Vector(0, 0), 5);
      const b = new Box(new Vector(10, 10), 5, 5);

      expect(hasCollided(a, b)).toBe(false);
    });
  });

  describe('Rectangle to Circle', () => {
    test('collision', () => {
      const a = new Box(new Vector(10, 10), 20, 20);
      const b = new Circle(new Vector(0, 0), 20);

      expect(hasCollided(a, b)).toBe(true);
    });

    test('no collision', () => {
      const a = new Box(new Vector(10, 10), 5, 5);
      const b = new Circle(new Vector(0, 0), 5);

      expect(hasCollided(a, b)).toBe(false);
    });
  });

  describe('Rectangle to Rectangle', () => {
    test('collision', () => {
      const a = new Box(new Vector(0, 0), 20, 20);
      const b = new Box(new Vector(10, 10), 20, 20);

      expect(hasCollided(a, b)).toBe(true);
    });

    test('no collision', () => {
      const a = new Box(new Vector(0, 0), 5);
      const b = new Box(new Vector(10, 10), 5, 5);

      expect(hasCollided(a, b)).toBe(false);
    });
  });
});
