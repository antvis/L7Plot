import { HeatmapLayer } from '../../../../src/core-layers/heatmap-layer';
import { getLayerStyleAttribute } from '../../../helper/layer';

describe('heatmap layer', () => {
  const layer = new HeatmapLayer({
    source: { data: [], parser: { type: 'json', x: 'x', y: 'y' } },
    shape: 'heatmap',
    size: {
      field: 'mag',
      value: [0, 1],
    },
    style: {
      intensity: 3,
      radius: 20,
      opacity: 1,
      rampColors: {
        colors: ['#FF4818', '#F7B74A', '#FFF598', '#F27DEB', '#8C1EB2', '#421EB2'],
        positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
      },
    },
  });

  it('type', () => {
    expect(layer.type).toBe('heatmapLayer');
    expect(layer.layer.type).toBe('HeatMapLayer');
  });

  it('size', () => {
    expect(getLayerStyleAttribute(layer.layer['pendingStyleAttributes'], 'size')).toEqual({
      attributeName: 'size',
      attributeField: 'mag',
      attributeValues: [0, 1],
    });
  });

  it('shape', () => {
    expect(getLayerStyleAttribute(layer.layer['pendingStyleAttributes'], 'shape')).toEqual({
      attributeName: 'shape',
      attributeField: 'heatmap',
    });
  });

  it('style', () => {
    expect(layer.layer['needUpdateConfig']).toMatchObject({
      intensity: 3,
      radius: 20,
      opacity: 1,
      rampColors: {
        colors: ['#FF4818', '#F7B74A', '#FFF598', '#F27DEB', '#8C1EB2', '#421EB2'],
        positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
      },
    });
  });
});
