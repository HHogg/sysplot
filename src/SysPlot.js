import ArchimedesSpiral from './algorithms/ArchimedesSpiral';
import getMaxShapeSize from './positioning/getMaxShapeSize';
import position from './positioning/position';

const defaultConfig = {
  algorithm: ArchimedesSpiral,
  cover: true,
  padding: 10,
  proportional: false,
  spread: 0.25,
};

export default class SysPlot {
  constructor() {
    this.config = Object.assign({}, defaultConfig);
  }

  setConfig(config = {}) {
    const {
      algorithm = defaultConfig.algorithm,
      cover = defaultConfig.cover,
      padding = defaultConfig.padding,
      proportional = defaultConfig.proportional,
      spread = defaultConfig.spread,
    } = config;

    const updateVectors =
      this.config.algorithm !== algorithm ||
      this.config.cover !== cover ||
      this.config.proportional !== proportional ||
      this.config.spread !== spread;

    const updatePositions = updateVectors ||
      this.config.padding !== padding;

    this.config = {
      algorithm,
      cover,
      padding,
      proportional,
      spread,
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
    const shapesBoundaryOffset = this.config.cover ? 0 : (getMaxShapeSize(shapes) / 2);

    this.positions = null;
    this.shapes = shapes;

    if (this.shapesBoundaryOffset !== shapesBoundaryOffset) {
      this.shapesBoundaryOffset = shapesBoundaryOffset;
      this.vectors = null;
    }

    return this;
  }

  getVectors() {
    if (!this.vectors) {
      const { config, width, height } = this;
      const h = height - this.shapesBoundaryOffset;
      const w = width - this.shapesBoundaryOffset;
      const [xDim, yDim] = config.proportional ? [w, h] : (w > h ? [w, w] : [h, h]);
      const spread = Math.max(0.1, Math.min(1, config.spread)) / 10;

      this.vectors = this.config.algorithm({
        cover: config.cover,
        height: h,
        width: w,
        xCenter: (w / 2) + (this.shapesBoundaryOffset / 2),
        xDistance: (xDim * (spread * (xDim / yDim)))
          * this.config.algorithm.NORMALISATION_FACTOR,
        yCenter: (h / 2) + (this.shapesBoundaryOffset / 2),
        yDistance: (yDim * (spread * (yDim / xDim)))
          * this.config.algorithm.NORMALISATION_FACTOR,
      });
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
