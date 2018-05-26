export default (shapes) => shapes.map((shape) => {
  if (!shape) {
    return shape;
  }

  if ('r' in shape) {
    return [shape.pos.x, shape.pos.y];
  }

  return [shape.pos.x, shape.pos.y];
});
