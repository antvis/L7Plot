import { getLayerStyleAttribute } from '../../../helper/layer';
import { DotLayer } from '../../../../src/composite-layers/dot-layer';

describe('dot layer', () => {
  const layer = new DotLayer({
    source: { data: [], parser: { type: 'json', x: 'x', y: 'y' } },
    size: 12,
    color: '#fff',
    // shape: 'circle',
    style: { opacity: 1, lineWidth: 1, stroke: 'red', lineOpacity: 0.8 },
    state: {
      active: {
        fill: 'red',
        stroke: 'green',
        lineWidth: 1.5,
        lineOpacity: 0.8,
      },
      select: {
        fill: 'red',
        stroke: 'yellow',
        lineWidth: 1.5,
        lineOpacity: 0.8,
      },
    },
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

  // it('shape', () => {
  //   expect(getLayerStyleAttribute(layer.fillLayer.layer['pendingStyleAttributes'], 'shape')).toEqual({
  //     attributeName: 'shape',
  //     attributeField: 'circle',
  //   });
  // });

  it('style', () => {
    expect(layer.fillLayer.layer['rawConfig']).toMatchObject({
      opacity: 1,
      strokeWidth: 1,
      stroke: 'red',
      strokeOpacity: 0.8,
    });
  });

  it('state', () => {
    expect(layer.fillLayer.layer['needUpdateConfig'].enableHighlight).toBeTruthy();
    expect(layer.fillLayer.layer['needUpdateConfig'].enableSelect).toBeFalsy();

    expect(getLayerStyleAttribute(layer.highlightStrokeLayer.layer['pendingStyleAttributes'], 'size')).toEqual({
      attributeName: 'size',
      attributeField: 12,
    });
    expect(layer.highlightStrokeLayer.layer['rawConfig']).toMatchObject({
      opacity: 0,
      strokeWidth: 1.5,
      stroke: 'green',
      strokeOpacity: 0.8,
    });

    expect(getLayerStyleAttribute(layer.selectStrokeLayer.layer['pendingStyleAttributes'], 'size')).toEqual({
      attributeName: 'size',
      attributeField: 12,
    });
    expect(layer.selectStrokeLayer.layer['rawConfig']).toMatchObject({
      opacity: 0,
      strokeWidth: 1.5,
      stroke: 'yellow',
      strokeOpacity: 0.8,
    });
  });
});
