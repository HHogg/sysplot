const pi2 = Math.PI * 2;

const ConcentricCircles = (w, h, cx, cy, xDist, yDist) => {
  const vectors = [[cx, cy]];
  const max = Math.hypot(cx, cy);
  let rx = 0;
  let ry = 0;
  let vx, vy;

  while (rx < max || ry < max) {
    rx += (xDist * 2);
    ry += (yDist * 2);

    let tx = 0;
    let ty = 0;

    while (tx < pi2 && ty < pi2) {
      tx += pi2 / (4 * ((rx / xDist) + 1));
      ty += pi2 / (4 * ((ry / yDist) + 1));
      vx = cx + rx * Math.cos(tx);
      vy = cy + ry * Math.sin(ty);

      if (vx > 0 && vy > 0 && vx < w && vy < h) {
        vectors.push([vx, vy]);
      }
    }
  }

  return vectors;
};

ConcentricCircles.NORMALISATION_FACTOR = 1.05;

export default ConcentricCircles;
