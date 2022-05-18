import { getLayerStyleAttribute } from '../../../helper/layer';
import { AreaLayer } from '../../../../src/composite-layers/area-layer';

describe('area layer', () => {
  const layer = new AreaLayer({
    source: { data: [] },
    color: {
      field: 'adcode',
      value: ['rgb(239,243,255)', 'rgb(189,215,231)', 'rgb(8,81,156)'],
    },
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
    style: {
      opacity: 1,
      stroke: 'rgb(93,112,146)',
      lineWidth: 0.6,
      lineOpacity: 1,
    },
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
    expect(layer.type).toBe('areaLayer');
    expect(layer.fillLayer).toBe('polygonLayer');
    expect(layer.strokeLayer).toBe('lineLayer');
    expect(layer.highlightStrokeLayer).toBe('lineLayer');
    expect(layer.selectFillLayer).toBe('polygonLayer');
    expect(layer.selectStrokeLayer).toBe('lineLayer');
    expect(layer.labelLayer).toBe('textLayer');
  });

  it('color', () => {
    expect(getLayerStyleAttribute(layer.fillLayer.layer['pendingStyleAttributes'], 'color')).toEqual({
      attributeName: 'color',
      attributeField: 'adcode',
      attributeValues: ['rgb(239,243,255)', 'rgb(189,215,231)', 'rgb(8,81,156)'],
    });
  });

  it('shape', () => {
    // expect(getLayerStyleAttribute(layer.fillLayer.layer['pendingStyleAttributes'], 'shape')).toEqual({
    //   attributeName: 'shape',
    //   attributeField: 'fill',
    // });
    expect(getLayerStyleAttribute(layer.strokeLayer.layer['pendingStyleAttributes'], 'shape')).toEqual({
      attributeName: 'shape',
      attributeField: 'line',
    });
  });

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
    expect(layer.fillLayer.layer['rawConfig']).toMatchObject({ opacity: 1 });

    expect(layer.strokeLayer.layer['rawConfig']).toMatchObject({ opacity: 1 });
    expect(getLayerStyleAttribute(layer.strokeLayer.layer['pendingStyleAttributes'], 'color')).toEqual({
      attributeName: 'color',
      attributeField: 'rgb(93,112,146)',
    });
    expect(getLayerStyleAttribute(layer.strokeLayer.layer['pendingStyleAttributes'], 'size')).toEqual({
      attributeName: 'size',
      attributeField: 0.6,
    });
  });

  it('state', () => {
    expect(layer.fillLayer.layer['needUpdateConfig'].enableHighlight).toBeTruthy();
    expect(layer.fillLayer.layer['needUpdateConfig'].enableSelect).toBeFalsy();

    expect(getLayerStyleAttribute(layer.highlightStrokeLayer.layer['pendingStyleAttributes'], 'color')).toEqual({
      attributeName: 'color',
      attributeField: 'green',
    });
    expect(getLayerStyleAttribute(layer.highlightStrokeLayer.layer['pendingStyleAttributes'], 'size')).toEqual({
      attributeName: 'size',
      attributeField: 1.5,
    });
    expect(layer.highlightStrokeLayer.layer['rawConfig']).toMatchObject({ opacity: 0.8 });

    expect(getLayerStyleAttribute(layer.selectStrokeLayer.layer['pendingStyleAttributes'], 'color')).toEqual({
      attributeName: 'color',
      attributeField: 'yellow',
    });
    expect(getLayerStyleAttribute(layer.selectStrokeLayer.layer['pendingStyleAttributes'], 'size')).toEqual({
      attributeName: 'size',
      attributeField: 1.5,
    });
    expect(layer.selectStrokeLayer.layer['rawConfig']).toMatchObject({ opacity: 0.8 });
  });
});
