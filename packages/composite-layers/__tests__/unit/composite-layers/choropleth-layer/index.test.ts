import { getLayerStyleAttribute } from '../../../helper/layer';
import { ChoroplethLayer } from '../../../../src/composite-layers/choropleth-layer';

describe('choropleth layer', () => {
  const layer = new ChoroplethLayer({
    source: { data: [] },
    fillColor: {
      field: 'adcode',
      value: ['rgb(239,243,255)', 'rgb(189,215,231)', 'rgb(8,81,156)'],
    },
    opacity: 1,
    strokeColor: 'rgb(93,112,146)',
    lineWidth: 0.6,
    lineOpacity: 1,
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
    state: {
      active: {
        fillColor: 'red',
        strokeColor: 'green',
        lineWidth: 1.5,
        lineOpacity: 0.8,
      },
      select: {
        fillColor: 'red',
        strokeColor: 'yellow',
        lineWidth: 1.5,
        lineOpacity: 0.8,
      },
    },
  });

  it('type', () => {
    expect(layer.type).toBe('choroplethLayer');
    expect(layer.fillLayer.type).toBe('polygonLayer');
    expect(layer.strokeLayer.type).toBe('lineLayer');
    expect(layer.highlightStrokeLayer.type).toBe('lineLayer');
    expect(layer.selectFillLayer.type).toBe('polygonLayer');
    expect(layer.selectStrokeLayer.type).toBe('lineLayer');
    expect(layer.labelLayer.type).toBe('textLayer');
  });

  it('color', () => {
    expect(getLayerStyleAttribute(layer.fillLayer.layer['pendingStyleAttributes'], 'color')).toEqual({
      attributeName: 'color',
      attributeField: 'adcode',
      attributeValues: ['rgb(239,243,255)', 'rgb(189,215,231)', 'rgb(8,81,156)'],
    });
  });

  it('shape', () => {
    expect(getLayerStyleAttribute(layer.fillLayer.layer['pendingStyleAttributes'], 'shape')).toEqual({
      attributeName: 'shape',
      attributeField: 'fill',
    });
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
