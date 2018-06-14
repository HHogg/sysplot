import position from './positioning/position';

export default class SysPlot {
  constructor() {
    this.config = {};
  }

  setConfig(config = {}) {
    const updateVectors =
      this.config.algorithm !== config.algorithm ||
      this.config.proportional !== config.proportional ||
      this.config.spread !== config.spread;

    const updatePositions = updateVectors ||
      this.config.padding !== config.padding;

    this.config = {
      algorithm: config.algorithm,
      padding: config.padding,
      proportional: config.proportional,
      spread: config.spread,
    };

    if (updateVectors) this.vectors = null;
    if (updatePositions) this.positions = null;

    return this;
  }

  setBounds(width, height) {
    if (width !== this.width || height !== this.height) {
      this.width = width;
      this.height = height;
      this.vectors = null;
      this.positions = null;
    }

    return this;
  }

  setShapes(shapes) {
    this.shapes = shapes;
    this.positions = null;

    return this;
  }

  getVectors() {
    if (!this.vectors) {
      const { config, width: w, height: h } = this;
      const [xDim, yDim] = config.proportional ? [w, h] : (w > h ? [w, w] : [h, h]);
      const spread = Math.max(0.1, Math.min(1, config.spread)) / 10;

      this.vectors = this.config.algorithm(
        this.width,
        this.height,
        this.width / 2,
        this.height / 2,
        (xDim * (spread * (xDim / yDim)))
          * this.config.algorithm.NORMALISATION_FACTOR,
        (yDim * (spread * (yDim / xDim)))
          * this.config.algorithm.NORMALISATION_FACTOR,
      );
    }

    return this.vectors;
  }

  getPositions() {
    if (!this.positions) {
      this.positions = position(
        this.width,
        this.height,
        this.getVectors(),
        this.shapes,
        this.config,
      );
    }

    return this.positions;
  }
}
