export default (shapes) => {
  let max;

  for (let i = 0; i < shapes.length; i++) {
    const { height, radius, width } = shapes[i];

    if (radius !== undefined) {
      if (!max || radius > max) max = radius * 2;
    } else if (width !== undefined && height !== undefined) {
      if (!max || width > max) max = width;
      if (height > max) max = height;
    }
  }

  return max || 0;
};
