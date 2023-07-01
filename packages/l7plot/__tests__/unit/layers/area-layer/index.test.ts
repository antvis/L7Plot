import { AreaLayer } from '../../../../src/layers/area-layer';
import { getLayerStyleAttribute } from '../../../helper/layer';

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
    expect(layer.layer.type).toBe('PolygonLayer');
    expect(layer.strokeLayer.type).toBe('LineLayer');
    expect(layer.highlightLayer.type).toBe('LineLayer');
    expect(layer.selectFillLayer.type).toBe('PolygonLayer');
    expect(layer.selectStrokeLayer.type).toBe('LineLayer');
  });

  it('color', () => {
    expect(getLayerStyleAttribute(layer.layer['pendingStyleAttributes'], 'color')).toEqual({
      attributeName: 'color',
      attributeField: 'adcode',
      attributeValues: ['rgb(239,243,255)', 'rgb(189,215,231)', 'rgb(8,81,156)'],
    });
  });

  it('shape', () => {
    expect(getLayerStyleAttribute(layer.layer['pendingStyleAttributes'], 'shape')).toEqual({
      attributeName: 'shape',
      attributeField: 'fill',
    });
    expect(getLayerStyleAttribute(layer.strokeLayer['pendingStyleAttributes'], 'shape')).toEqual({
      attributeName: 'shape',
      attributeField: 'line',
    });
  });

  it('style', () => {
    expect(layer.layer['needUpdateConfig']).toMatchObject({ opacity: 1 });
  });

  it('state', () => {
    expect(getLayerStyleAttribute(layer.highlightLayer['pendingStyleAttributes'], 'color')).toEqual({
      attributeName: 'color',
      attributeField: 'green',
    });
    expect(getLayerStyleAttribute(layer.highlightLayer['pendingStyleAttributes'], 'size')).toEqual({
      attributeName: 'size',
      attributeField: 1.5,
    });
    expect(layer.highlightLayer['needUpdateConfig']).toMatchObject({ opacity: 0.8 });
    expect(getLayerStyleAttribute(layer.selectStrokeLayer['pendingStyleAttributes'], 'color')).toEqual({
      attributeName: 'color',
      attributeField: 'yellow',
    });
    expect(getLayerStyleAttribute(layer.selectStrokeLayer['pendingStyleAttributes'], 'size')).toEqual({
      attributeName: 'size',
      attributeField: 1.5,
    });
    expect(layer.selectStrokeLayer['needUpdateConfig']).toMatchObject({ opacity: 0.8 });
  });
});
