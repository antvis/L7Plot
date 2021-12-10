import { getLayerStyleAttribute } from '../../../helper/layer';
import { ArcLayer } from '../../../../src/layers/arc-layer';

describe('arc layer', () => {
  const layer = new ArcLayer({
    source: { data: [], parser: { type: 'json', coordinates: 'coordinates' } },
    color: '#fff',
    size: 1,
    style: { opacity: 1 },
    state: { active: true, select: true },
  });

  it('type', () => {
    expect(layer.type).toBe('arcLayer');
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
      attributeField: 'arc',
    });
  });

  it('style', () => {
    expect(layer.layer['rawConfig']).toMatchObject({ opacity: 1 });
  });

  it('state', () => {
    expect(layer.layer['needUpdateConfig'].enableHighlight).toBeTruthy();
    expect(layer.layer['needUpdateConfig'].enableSelect).toBeTruthy();
  });
});
