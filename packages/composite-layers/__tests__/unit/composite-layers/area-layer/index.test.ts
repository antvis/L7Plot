import { getLayerStyleAttribute } from '../../../helper/layer';
import { AreaLayer } from '../../../../src/composite-layers/area-layer';

describe('area layer', () => {
  const layer = new AreaLayer({
    source: { data: [] },
    color: {
      field: 'adcode',
      value: ['rgb(239,243,255)', 'rgb(189,215,231)', 'rgb(8,81,156)'],
    },
    style: {
      opacity: 1,
      stroke: 'rgb(93,112,146)',
      lineWidth: 0.6,
      lineOpacity: 1,
    },
    state: {
      active: {
        stroke: 'green',
        lineWidth: 1.5,
        lineOpacity: 0.8,
      },
      select: {
        stroke: 'yellow',
        lineWidth: 1.5,
        lineOpacity: 0.8,
      },
    },
  });

  it('type', () => {
    expect(layer.type).toBe('areaLayer');
    expect(layer.fillLayer).toBe('polygonLayer');
    expect(layer.strokeLayer).toBe('lineLayer');
    expect(layer.highlightLayer).toBe('lineLayer');
    expect(layer.selectFillLayer).toBe('polygonLayer');
    expect(layer.selectStrokeLayer).toBe('lineLayer');
  });

  it('color', () => {
    expect(getLayerStyleAttribute(layer.fillLayer.layer['pendingStyleAttributes'], 'color')).toEqual({
      attributeName: 'color',
      attributeField: 'adcode',
      attributeValues: ['rgb(239,243,255)', 'rgb(189,215,231)', 'rgb(8,81,156)'],
    });
  });

  it('shape', () => {
    expect(getLayerStyleAttribute(layer.fillLayer.layer['pendingStyleAttributes'], 'shape')).toEqual({
      attributeName: 'shape',
      attributeField: 'fill',
    });
    expect(getLayerStyleAttribute(layer.strokeLayer.layer['pendingStyleAttributes'], 'shape')).toEqual({
      attributeName: 'shape',
      attributeField: 'line',
    });
  });

  it('style', () => {
    expect(layer.fillLayer['rawConfig']).toMatchObject({ opacity: 1 });
  });

  it('state', () => {
    expect(getLayerStyleAttribute(layer.highlightLayer.layer['pendingStyleAttributes'], 'color')).toEqual({
      attributeName: 'color',
      attributeField: 'green',
    });
    expect(getLayerStyleAttribute(layer.highlightLayer.layer['pendingStyleAttributes'], 'size')).toEqual({
      attributeName: 'size',
      attributeField: 1.5,
    });
    expect(layer.highlightLayer['rawConfig']).toMatchObject({ opacity: 0.8 });
    expect(getLayerStyleAttribute(layer.selectStrokeLayer.layer['pendingStyleAttributes'], 'color')).toEqual({
      attributeName: 'color',
      attributeField: 'yellow',
    });
    expect(getLayerStyleAttribute(layer.selectStrokeLayer.layer['pendingStyleAttributes'], 'size')).toEqual({
      attributeName: 'size',
      attributeField: 1.5,
    });
    expect(layer.selectStrokeLayer.layer['rawConfig']).toMatchObject({ opacity: 0.8 });
  });
});
