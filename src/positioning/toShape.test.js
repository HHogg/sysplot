import { Box, Circle } from 'sat';
import toShape from './toShape';

describe('toShape', () => {
  test('radius as Circle', () => {
    expect(toShape([0, 0], { radius: 10 }) instanceof Circle).toBe(true);
  });

  test('width and height as Box', () => {
    expect(toShape([0, 0], { width: 10, height: 10 }) instanceof Box).toBe(true);
  });

  test('points', () => {
    expect(() => toShape([0, 0], { points: [0, 0] })).toThrow();
  });
});
