import getMaxShapeSize from './getMaxShapeSize';

describe('getMaxShapeSize', () => {
  test('no shapes', () => {
    expect(getMaxShapeSize([])).toBe(0);
  });

  test('one shape with radius', () => {
    expect(getMaxShapeSize([{ radius: 10 }])).toBe(20);
  });

  test('one shape with same width and height', () => {
    expect(getMaxShapeSize([{ height: 10, width: 10 }])).toBe(10);
  });

  test('one shape with greater width and height', () => {
    expect(getMaxShapeSize([{ height: 10, width: 20 }])).toBe(20);
  });

  test('one shape with width and greater height', () => {
    expect(getMaxShapeSize([{ height: 20, width: 10 }])).toBe(20);
  });

  test('multiple shapes with radius', () => {
    expect(getMaxShapeSize([
      { radius: 20 },
      { radius: 40 },
      { radius: 30 },
    ])).toBe(40);
  });

  test('multiple shapes with width and height', () => {
    expect(getMaxShapeSize([
      { height: 20, width: 10 },
      { height: 30, width: 10 },
      { height: 20, width: 40 },
    ])).toBe(40);
  });

  test('multiple mixed shapes with greater radius and width and height', () => {
    expect(getMaxShapeSize([
      { radius: 20 },
      { radius: 40 },
      { radius: 30 },
      { height: 20, width: 10 },
      { height: 30, width: 10 },
    ])).toBe(40);
  });

  test('multiple mixed shapes with radius and greater width and height', () => {
    expect(getMaxShapeSize([
      { radius: 20 },
      { radius: 30 },
      { radius: 30 },
      { height: 20, width: 10 },
      { height: 30, width: 40 },
    ])).toBe(40);
  });
});
