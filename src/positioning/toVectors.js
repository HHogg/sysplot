export default (shapes) =>
  shapes.map((shape) => shape
    ? [shape.pos.x, shape.pos.y]
    : shape
  );
