import { getLayerStyleAttribute } from '../../../helper/layer';
import { PrismLayer } from '../../../../src/layers/prism-layer';

describe('prism layer', () => {
  const layer = new PrismLayer({
    source: { data: [] },
    color: {
      field: 'adcode',
      value: ['rgb(239,243,255)', 'rgb(189,215,231)', 'rgb(8,81,156)'],
    },
    size: 100,
    style: {
      opacity: 1,
    },
    state: { active: true, select: true },
  });

  it('type', () => {
    expect(layer.type).toBe('prismLayer');
    expect(layer.layer.type).toBe('PolygonLayer');
  });

  it('color', () => {
    expect(getLayerStyleAttribute(layer.layer['pendingStyleAttributes'], 'color')).toEqual({
      attributeName: 'color',
      attributeField: 'adcode',
      attributeValues: ['rgb(239,243,255)', 'rgb(189,215,231)', 'rgb(8,81,156)'],
    });
  });

  it('size', () => {
    expect(getLayerStyleAttribute(layer.layer['pendingStyleAttributes'], 'size')).toEqual({
      attributeName: 'size',
      attributeField: 100,
    });
  });

  it('shape', () => {
    expect(getLayerStyleAttribute(layer.layer['pendingStyleAttributes'], 'shape')).toEqual({
      attributeName: 'shape',
      attributeField: 'extrude',
    });
  });

  it('style', () => {
    expect(layer.layer['rawConfig']).toMatchObject({ opacity: 1 });
  });

  it('state', () => {
    expect(layer.layer['needUpdateConfig'].enableHighlight).toBeDefined();
    expect(layer.layer['needUpdateConfig'].enableSelect).toBeDefined();
  });
});
