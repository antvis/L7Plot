import { getLayerStyleAttribute } from '../../../helper/layer';
import { LabelLayer } from '../../../../src/layers/label-layer';
import { Source } from '../../../../src/types';

describe('label layer', () => {
  const layer = new LabelLayer({
    source: new Source([], { parser: { type: 'json', x: 'x', y: 'y' } }),
    content: 'label',
    style: {
      fill: '#fff',
      opacity: 0.6,
      fontSize: 12,
      textAnchor: 'top',
      textOffset: [0, 20],
      spacing: 1,
      padding: [5, 5],
      stroke: '#ffffff',
      strokeWidth: 0.3,
      strokeOpacity: 1.0,
    },
    state: { active: true, select: true },
  });

  it('type', () => {
    expect(layer.type).toBe('labelLayer');
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
      attributeField: 'label',
      attributeValues: 'text',
    });
  });

  it('style', () => {
    expect(layer.layer['rawConfig']).toMatchObject({
      opacity: 0.6,
      textAnchor: 'top',
      textOffset: [0, 20],
      spacing: 1,
      padding: [5, 5],
      stroke: '#ffffff',
      strokeWidth: 0.3,
      strokeOpacity: 1.0,
    });
  });

  it('state', () => {
    expect(layer.layer['needUpdateConfig'].enableHighlight).toBeTruthy();
    expect(layer.layer['needUpdateConfig'].enableSelect).toBeTruthy();
  });
});
