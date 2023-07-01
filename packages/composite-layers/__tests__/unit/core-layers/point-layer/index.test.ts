import { PointLayer } from '../../../../src/core-layers/point-layer';
import { getLayerStyleAttribute } from '../../../helper/layer';

describe('point layer', () => {
  const layer = new PointLayer({
    source: { data: [], parser: { type: 'json', x: 'x', y: 'y' } },
    size: 12,
    color: '#fff',
    shape: 'circle',
    style: { opacity: 1, strokeWidth: 1, stroke: 'red' },
    state: { active: true, select: true },
  });

  it('type', () => {
    expect(layer.type).toBe('pointLayer');
    expect(layer.layer.type).toBe('PointLayer');
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
      attributeField: '#fff',
    });
  });

  it('shape', () => {
    expect(getLayerStyleAttribute(layer.layer['pendingStyleAttributes'], 'shape')).toEqual({
      attributeName: 'shape',
      attributeField: 'circle',
    });
  });

  it('style', () => {
    expect(layer.layer['needUpdateConfig']).toMatchObject({ opacity: 1, strokeWidth: 1, stroke: 'red' });
  });

  it('state', () => {
    expect(layer.layer['needUpdateConfig'].enableHighlight).toBeTruthy();
    expect(layer.layer['needUpdateConfig'].enableSelect).toBeTruthy();
  });
});
