import { getLayerStyleAttribute } from '../../../helper/layer';
import { LabelLayerWrapper } from '../../../../src/layers/label-layer';
import { Source } from '../../../../src/types';

describe('label layer', () => {
  const layerWrapper = new LabelLayerWrapper({
    source: new Source([]),
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
      attributeField: 'label',
      attributeValues: 'text',
    });
  });

  it('style', () => {
    expect(layerWrapper.layer['rawConfig']).toMatchObject({
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
    expect(layerWrapper.layer['needUpdateConfig'].enableHighlight).toBeTruthy();
    expect(layerWrapper.layer['needUpdateConfig'].enableSelect).toBeTruthy();
  });
});
