import SysPlot, { ArchimedesSpiral, VogelSpiral } from './';

describe('SysPlot class', () => {
  let sysPlot;
  let vectors;
  let positions;

  const getShapes = () => [{ radius: 50 }, { radius: 25 }, { radius: 15 }, { radius: 10 }];
  const getConfig = (config) => ({
    algorithm: ArchimedesSpiral,
    padding: 10,
    proportional: true,
    spread: 0.5,
    ...config,
  });

  beforeEach(() => {
    sysPlot = new SysPlot()
      .setBounds(500, 500)
      .setShapes(getShapes())
      .setConfig(getConfig());

    vectors = sysPlot.getVectors();
    positions = sysPlot.getPositions();
  });

  beforeEach(() => {
    expect(sysPlot.vectors).not.toBe(null);
    expect(sysPlot.positions).not.toBe(null);
  });

  describe('setConfig', () => {
    test('algorithm clears vectors and positions', () => {
      sysPlot.setConfig(getConfig({ algorithm: VogelSpiral }));

      expect(sysPlot.config.algorithm).toBe(VogelSpiral);
      expect(sysPlot.vectors).toBe(null);
      expect(sysPlot.positions).toBe(null);
    });

    test('proportional clears vectors and positions', () => {
      sysPlot.setConfig(getConfig({ proportional: false }));

      expect(sysPlot.config.proportional).toBe(false);
      expect(sysPlot.vectors).toBe(null);
      expect(sysPlot.positions).toBe(null);
    });

    test('spread clears vectors and positions', () => {
      sysPlot.setConfig(getConfig({ spread: 0.4 }));

      expect(sysPlot.config.spread).toBe(0.4);
      expect(sysPlot.vectors).toBe(null);
      expect(sysPlot.positions).toBe(null);
    });

    test('padding clears positions', () => {
      sysPlot.setConfig(getConfig({ padding: 5 }));

      expect(sysPlot.config.padding).toBe(5);
      expect(sysPlot.vectors).not.toBe(null);
      expect(sysPlot.positions).toBe(null);
    });
  });

  describe('setBounds', () => {
    test('sets width and height', () => {
      sysPlot.setBounds(100, 100);

      expect(sysPlot.width).toBe(100);
      expect(sysPlot.height).toBe(100);
    });

    test('clears vectors and positions when bounds have changed', () => {
      sysPlot.setBounds(100, 100);

      expect(sysPlot.vectors).toBe(null);
      expect(sysPlot.positions).toBe(null);
    });
  });

  describe('setShapes', () => {
    test('sets shapes', () => {
      const shapes = getShapes();

      sysPlot.setShapes(shapes);

      expect(sysPlot.shapes).toBe(shapes);
    });

    test('clears positions', () => {
      sysPlot.setShapes(getShapes());

      expect(sysPlot.positions).toBe(null);
    });
  });

  describe('getVectors', () => {
    const MockAlgorithm = jest.fn();
    MockAlgorithm.NORMALISATION_FACTOR = 1;

    test('returns last vectors if vectors is set', () => {
      expect(sysPlot.getVectors()).toBe(vectors);
    });

    test('fetches new vectors if vectors are set', () => {
      sysPlot.vectors = null;
      expect(sysPlot.getVectors()).not.toBe(vectors);
    });
  });

  describe('getPositions', () => {
    test('returns last positions if positions is set', () => {
      expect(sysPlot.getPositions()).toBe(positions);
    });

    test('fetches new positions if positions are not set', () => {
      sysPlot.positions = null;
      expect(sysPlot.getPositions()).not.toBe(positions);
    });
  });
});
