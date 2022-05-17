import { getLayerStyleAttribute } from '../../../helper/layer';
import { DotLayer } from '../../../../src/composite-layers/dot-layer';

describe('dot layer', () => {
  const layer = new DotLayer({
    source: { data: [], parser: { type: 'json', x: 'x', y: 'y' } },
    size: 12,
    color: '#fff',
    shape: 'circle',
    style: { opacity: 1, strokeWidth: 1, stroke: 'red' },
    state: { active: true, select: true },
  });

  it('type', () => {
    expect(layer.type).toBe('dotLayer');
    expect(layer.fillLayer.type).toBe('pointLayer');
  });

  it('size', () => {
    expect(getLayerStyleAttribute(layer.fillLayer.layer['pendingStyleAttributes'], 'size')).toEqual({
      attributeName: 'size',
      attributeField: 12,
    });
  });

  it('color', () => {
    expect(getLayerStyleAttribute(layer.fillLayer.layer['pendingStyleAttributes'], 'color')).toEqual({
      attributeName: 'color',
      attributeField: '#fff',
    });
  });

  it('shape', () => {
    expect(getLayerStyleAttribute(layer.fillLayer.layer['pendingStyleAttributes'], 'shape')).toEqual({
      attributeName: 'shape',
      attributeField: 'circle',
    });
  });

  it('style', () => {
    expect(layer.fillLayer.layer['rawConfig']).toMatchObject({ opacity: 1, strokeWidth: 1, stroke: 'red' });
  });

  it('state', () => {
    expect(layer.fillLayer.layer['needUpdateConfig'].enableHighlight).toBeTruthy();
    expect(layer.fillLayer.layer['needUpdateConfig'].enableSelect).toBeTruthy();
  });
});
