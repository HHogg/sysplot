import { Box, Circle, Vector } from 'sat';
import toVectors from './toVectors';

describe('toVectors', () => {
  test('Circle', () => {
    expect(toVectors([ new Circle(new Vector(0, 0), 10)])).toEqual([
      [0, 0],
    ]);
  });

  test('Rectangle', () => {
    expect(toVectors([ new Box(new Vector(0, 0), 10, 10)])).toEqual([
      [0, 0],
    ]);
  });
});
