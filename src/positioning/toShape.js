import {
  Box,
  Circle,
  Vector,
} from 'sat';

export default ([x, y], shape, padding = 0) => {
  if ('radius' in shape) {
    return new Circle(
      new Vector(x, y),
      shape.radius + padding,
    );
  }

  if ('width' in shape && 'height' in shape) {
    const width = shape.width + (padding * 2);
    const height = shape.height + (padding * 2);
    const cx = (x + padding) - (width / 2);
    const cy = (y + padding) - (height / 2);

    const box = new Box(
      new Vector(cx, cy),
      width,
      height,
    );

    return box;
  }

  throw new Error('Only Rectangles and Circles are currently supported. ' +
    'Please supply either radius or width and height. Polygons coming soon!');
};
