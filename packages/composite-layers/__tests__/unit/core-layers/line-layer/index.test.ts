import { getLayerStyleAttribute } from '../../../helper/layer';
import { LineLayer } from '../../../../src/core-layers/line-layer';

describe('line layer', () => {
  const layer = new LineLayer({
    source: { data: [], parser: { type: 'json', coordinates: 'coordinates' } },
    color: '#fff',
    shape: 'line',
    size: 1,
    style: { opacity: 1, lineType: 'dash' },
    state: { active: true, select: true },
  });

  it('type', () => {
    expect(layer.type).toBe('lineLayer');
    expect(layer.layer.type).toBe('LineLayer');
  });

  it('size', () => {
    expect(getLayerStyleAttribute(layer.layer['pendingStyleAttributes'], 'size')).toEqual({
      attributeName: 'size',
      attributeField: 1,
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
      attributeField: 'line',
    });
  });

  it('style', () => {
    expect(layer.layer['rawConfig']).toMatchObject({ opacity: 1, lineType: 'dash' });
  });

  it('state', () => {
    expect(layer.layer['needUpdateConfig'].enableHighlight).toBeTruthy();
    expect(layer.layer['needUpdateConfig'].enableSelect).toBeTruthy();
  });
});
