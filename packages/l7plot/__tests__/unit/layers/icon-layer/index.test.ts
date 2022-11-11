import { Source } from '@antv/l7';
import { getLayerStyleAttribute } from '../../../helper/layer';
import { IconLayer } from '../../../../src/layers/icon-layer';
import { registerImages } from '../../../../src';

describe('icon layer', () => {
  const images = [
    { id: '02', image: 'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg' },
  ];
  registerImages(images);

  const layer = new IconLayer({
    source: new Source([], { parser: { type: 'json', x: 'x', y: 'y' } }),
    size: 12,
    shape: '02',
    color: '#fff',
    style: { opacity: 1, strokeWidth: 1, stroke: 'red' },
    state: { active: true, select: true },
  });

  it('type', () => {
    expect(layer.type).toBe('iconLayer');
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
      attributeField: '02',
    });
  });

  it('style', () => {
    expect(layer.layer['rawConfig']).toMatchObject({ opacity: 1, strokeWidth: 1, stroke: 'red' });
  });

  it('state', () => {
    expect(layer.layer['needUpdateConfig'].enableHighlight).toBeTruthy();
    expect(layer.layer['needUpdateConfig'].enableSelect).toBeTruthy();
  });
});
