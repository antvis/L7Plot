import { PolygonLayer } from '../../../../src/core-layers/polygon-layer';
import { getLayerStyleAttribute } from '../../../helper/layer';

describe('polygon layer', () => {
  const layer = new PolygonLayer({
    source: { data: [] },
    size: 12,
    shape: 'fill',
    color: {
      field: 'adcode',
      value: ['rgb(239,243,255)', 'rgb(189,215,231)', 'rgb(8,81,156)'],
    },
    style: { opacity: 1 },
    state: { active: true, select: true },
  });

  it('type', () => {
    expect(layer.type).toBe('polygonLayer');
    expect(layer.layer.type).toBe('PolygonLayer');
  });

  it('size', () => {
    expect(getLayerStyleAttribute(layer.layer['pendingStyleAttributes'], 'size')).toEqual({
      attributeName: 'size',
      attributeField: 12,
    });
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
  });

  it('style', () => {
    expect(layer.layer['needUpdateConfig']).toMatchObject({ opacity: 1 });
  });

  it('state', () => {
    expect(layer.layer['needUpdateConfig'].enableHighlight).toBeTruthy();
    expect(layer.layer['needUpdateConfig'].enableSelect).toBeTruthy();
  });
});
