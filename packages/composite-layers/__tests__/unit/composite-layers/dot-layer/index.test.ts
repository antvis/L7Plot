import { getLayerStyleAttribute } from '../../../helper/layer';
import { DotLayer } from '../../../../src/composite-layers/dot-layer';

describe('dot layer', () => {
  const layer = new DotLayer({
    source: { data: [], parser: { type: 'json', x: 'x', y: 'y' } },
    size: 12,
    color: '#fff',
    // shape: 'circle',
    label: {
      field: 'label',
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
    },
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
    expect(layer.highlightStrokeLayer).toBe('pointLayer');
    expect(layer.selectFillLayer).toBe('pointLayer');
    expect(layer.selectStrokeLayer).toBe('pointLayer');
    expect(layer.labelLayer).toBe('textLayer');
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

  it('label', () => {
    expect(getLayerStyleAttribute(layer.labelLayer.layer['pendingStyleAttributes'], 'size')).toEqual({
      attributeName: 'size',
      attributeField: 12,
    });
    expect(getLayerStyleAttribute(layer.labelLayer.layer['pendingStyleAttributes'], 'color')).toEqual({
      attributeName: 'color',
      attributeField: '#fff',
    });
    expect(getLayerStyleAttribute(layer.labelLayer.layer['pendingStyleAttributes'], 'shape')).toEqual({
      attributeName: 'shape',
      attributeField: 'label',
      attributeValues: 'text',
    });
    expect(layer.labelLayer.layer['rawConfig']).toMatchObject({
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
