import { getLayerStyleAttribute } from '../../../helper/layer';
import { PathLayer } from '../../../../src/layers/path-layer';

describe('path layer', () => {
  const layer = new PathLayer({
    source: { data: [], parser: { type: 'json', coordinates: 'coordinates' } },
    color: '#fff',
    size: 1,
    style: { opacity: 1, lineType: 'dash' },
    state: { active: true, select: true },
  });

  it('type', () => {
    expect(layer.type).toBe('pathLayer');
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
