import hasCollided from './hasCollided';
import isInBounds from './isInBounds';
import toShape from './toShape';
import toVectors from './toVectors';

const hasNoCollision = (positions, shape) => {
  const pl = positions.length;

  for (let p = 0; p < pl; p++) {
    if (positions[p] && hasCollided(shape, positions[p])) {
      return false;
    }
  }

  return true;
};

export default (width, height, vectors, shapes, config) => {
  const vl = vectors.length;

  return toVectors(shapes.reduce((positions, s) => {
    for (let v = 0; v < vl; v++) {
      const shape = toShape(vectors[v], s, config.padding);

      if (isInBounds(width, height, shape) &&
            hasNoCollision(positions, shape)) {
        positions.push(shape);
        return positions;
      }
    }

    positions.push(null);

    return positions;
  }, []));
};
