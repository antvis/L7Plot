import { getLayerStyleAttribute } from '../../../helper/layer';
import { PointLayerWrapper } from '../../../../src/layers/point-layer';
import { Source } from '../../../../src/types';

describe('point layer', () => {
  const layerWrapper = new PointLayerWrapper({
    source: new Source([], { parser: { type: 'json', x: 'x', y: 'y' } }),
    size: 12,
    color: '#fff',
    shape: 'circle',
    style: { opacity: 1, strokeWidth: 1, stroke: 'red' },
    state: { active: true, select: true },
  });

  it('type', () => {
    expect(layerWrapper.layer.type).toBe('PointLayer');
  });

  it('size', () => {
    expect(getLayerStyleAttribute(layerWrapper.layer['pendingStyleAttributes'], 'size')).toEqual({
      attributeName: 'size',
      attributeField: 12,
    });
  });

  it('color', () => {
    expect(getLayerStyleAttribute(layerWrapper.layer['pendingStyleAttributes'], 'color')).toEqual({
      attributeName: 'color',
      attributeField: '#fff',
    });
  });

  it('shape', () => {
    expect(getLayerStyleAttribute(layerWrapper.layer['pendingStyleAttributes'], 'shape')).toEqual({
      attributeName: 'shape',
      attributeField: 'circle',
    });
  });

  it('style', () => {
    expect(layerWrapper.layer['rawConfig']).toMatchObject({ opacity: 1, strokeWidth: 1, stroke: 'red' });
  });

  it('state', () => {
    expect(layerWrapper.layer['needUpdateConfig'].enableHighlight).toBeTruthy();
    expect(layerWrapper.layer['needUpdateConfig'].enableSelect).toBeTruthy();
  });
});
