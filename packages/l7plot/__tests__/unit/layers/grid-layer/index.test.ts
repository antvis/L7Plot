import { GridLayer } from '../../../../src/layers/grid-layer';
import { getLayerStyleAttribute } from '../../../helper/layer';

describe('grid layer', () => {
  const layer = new GridLayer({
    source: {
      data: [],
      parser: { type: 'json', x: 'x', y: 'y' },
      aggregation: {
        radius: 1200,
        field: 'rank',
        method: 'sum',
      },
    },
    color: {
      field: 'sum',
      value: ['#0553A1', '#0B79B0', '#DCE872'],
    },
    shape: 'square',
    size: {
      field: 'mag',
      value: [0, 100],
    },
    style: {
      coverage: 0.8,
      angle: 0,
      opacity: 1.0,
    },
  });

  it('type', () => {
    expect(layer.type).toBe('gridLayer');
    expect(layer.layer.type).toBe('HeatMapLayer');
  });

  it('size', () => {
    expect(getLayerStyleAttribute(layer.layer['pendingStyleAttributes'], 'size')).toEqual({
      attributeName: 'size',
      attributeField: 'mag',
      attributeValues: [0, 100],
    });
  });

  it('color', () => {
    expect(getLayerStyleAttribute(layer.layer['pendingStyleAttributes'], 'color')).toEqual({
      attributeName: 'color',
      attributeField: 'sum',
      attributeValues: ['#0553A1', '#0B79B0', '#DCE872'],
    });
  });

  it('shape', () => {
    expect(getLayerStyleAttribute(layer.layer['pendingStyleAttributes'], 'shape')).toEqual({
      attributeName: 'shape',
      attributeField: 'square',
    });
  });

  it('style', () => {
    expect(layer.layer['needUpdateConfig']).toMatchObject({
      coverage: 0.8,
      angle: 0,
      opacity: 1.0,
    });
  });
});
