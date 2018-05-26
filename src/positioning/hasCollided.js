import {
  Circle,
  testCircleCircle,
  testPolygonCircle,
  testPolygonPolygon,
} from 'sat';

export default (a, b) => {
  if (!a || !b) {
    return false;
  }

  if (a instanceof Circle) {
    if (b instanceof Circle) {
      return testCircleCircle(a, b);
    }

    return testPolygonCircle(b.toPolygon(), a);
  }

  if (b instanceof Circle) {
    return testPolygonCircle(a.toPolygon(), b);
  }

  return testPolygonPolygon(a.toPolygon(), b.toPolygon());
};
