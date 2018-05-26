export default (width, height, shape) => {
  const { h, r, w, pos: { x, y } } = shape;

  if ('r' in shape) {
    return x >= r && y >= r && (x + r) <= width && (y + r) <= height;
  }

  if ('h' in shape && 'w' in shape) {
    return x >= 0 && y >= h && (x + w) <= width && y <= height;
  }

  return false;
};
