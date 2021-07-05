import { getLayerStyleAttribute } from '../../../helper/layer';
import { PointLayerWrapper } from '../../../../src/layers/point-layer';
import { Source } from '../../../../src/types';

describe('mapping layer', () => {
  it('shape', () => {
    const layerWrapper = new PointLayerWrapper({
      source: new Source([]),
      shape: 'circle',
    });

    expect(layerWrapper.layer.type).toBe('PointLayer');

    expect(getLayerStyleAttribute(layerWrapper.layer['pendingStyleAttributes'], 'shape')).toEqual({
      attributeName: 'shape',
      attributeField: 'circle',
    });

    layerWrapper.updateOptions({
      shape: () => 'square',
    });
    expect(
      getLayerStyleAttribute(layerWrapper.layer['pendingStyleAttributes'], 'shape')?.attributeValues
    ).toBeDefined();

    layerWrapper.updateOptions({
      shape: {
        field: 'x',
        value: ['circle', 'square'],
      },
    });
    expect(getLayerStyleAttribute(layerWrapper.layer['pendingStyleAttributes'], 'shape')).toEqual({
      attributeName: 'shape',
      attributeField: 'x',
      attributeValues: ['circle', 'square'],
    });

    layerWrapper.updateOptions({
      shape: {
        field: 'shape',
        value: ({ shape }) => shape,
      },
    });
    expect(
      getLayerStyleAttribute(layerWrapper.layer['pendingStyleAttributes'], 'shape')?.attributeValues
    ).toBeDefined();
  });

  it('size', () => {
    const layerWrapper = new PointLayerWrapper({
      source: new Source([]),
      size: 12,
    });

    expect(layerWrapper.layer.type).toBe('PointLayer');

    expect(getLayerStyleAttribute(layerWrapper.layer['pendingStyleAttributes'], 'size')).toEqual({
      attributeName: 'size',
      attributeField: 12,
    });

    layerWrapper.updateOptions({
      size: () => 12,
    });
    expect(getLayerStyleAttribute(layerWrapper.layer['pendingStyleAttributes'], 'size')?.attributeValues).toBeDefined();

    layerWrapper.updateOptions({
      size: {
        field: 'x',
        value: [12, 14],
      },
    });
    expect(getLayerStyleAttribute(layerWrapper.layer['pendingStyleAttributes'], 'size')).toEqual({
      attributeName: 'size',
      attributeField: 'x',
      attributeValues: [12, 14],
    });

    layerWrapper.updateOptions({
      size: {
        field: 'size',
        value: ({ size }) => size,
      },
    });
    expect(getLayerStyleAttribute(layerWrapper.layer['pendingStyleAttributes'], 'size')?.attributeValues).toBeDefined();
  });

  it('color', () => {
    const layerWrapper = new PointLayerWrapper({
      source: new Source([]),
      color: 'red',
    });

    expect(layerWrapper.layer.type).toBe('PointLayer');

    expect(getLayerStyleAttribute(layerWrapper.layer['pendingStyleAttributes'], 'color')).toEqual({
      attributeName: 'color',
      attributeField: 'red',
    });

    layerWrapper.updateOptions({
      color: () => 'red',
    });
    expect(
      getLayerStyleAttribute(layerWrapper.layer['pendingStyleAttributes'], 'color')?.attributeValues
    ).toBeDefined();

    layerWrapper.updateOptions({
      color: {
        field: 'x',
        value: ['red', 'blue'],
      },
    });
    expect(getLayerStyleAttribute(layerWrapper.layer['pendingStyleAttributes'], 'color')).toEqual({
      attributeName: 'color',
      attributeField: 'x',
      attributeValues: ['red', 'blue'],
    });

    layerWrapper.updateOptions({
      color: {
        field: 'color',
        value: ({ color }) => color,
      },
    });
    expect(
      getLayerStyleAttribute(layerWrapper.layer['pendingStyleAttributes'], 'color')?.attributeValues
    ).toBeDefined();
  });

  it('style', () => {
    const layerWrapper = new PointLayerWrapper({
      source: new Source([]),
      style: { opacity: 1, strokeWidth: 1, stroke: 'red' },
    });

    expect(layerWrapper.layer.type).toBe('PointLayer');

    expect(layerWrapper.layer['rawConfig']).toMatchObject({ opacity: 1, strokeWidth: 1, stroke: 'red' });
  });

  it('state', () => {
    const layerWrapper = new PointLayerWrapper({
      source: new Source([]),
      state: { active: true, select: true },
    });

    expect(layerWrapper.layer.type).toBe('PointLayer');

    expect(layerWrapper.layer['needUpdateConfig'].enableHighlight).toBeTruthy();
    expect(layerWrapper.layer['needUpdateConfig'].enableSelect).toBeTruthy();
  });

  it('rotate', () => {
    const layerWrapper = new PointLayerWrapper({
      source: new Source([]),
      // rotate: 45,
    });

    expect(layerWrapper.layer.type).toBe('PointLayer');

    // expect(getLayerStyleAttribute(layerWrapper.layer['pendingStyleAttributes'], 'rotate')).toEqual({
    //   attributeName: 'rotate',
    //   attributeField: 45,
    // });
  });

  it('animate', () => {
    const layerWrapper = new PointLayerWrapper({
      source: new Source([]),
      animate: true,
    });

    expect(layerWrapper.layer.type).toBe('PointLayer');

    expect(layerWrapper.layer['needUpdateConfig'].animateOption.enable).toBeTruthy();
  });

  it('scale', () => {
    const layerWrapper = new PointLayerWrapper({
      source: new Source([]),
      size: {
        field: 'x',
        value: [12, 14],
        type: 'quantize',
      },
    });

    expect(layerWrapper.layer.type).toBe('PointLayer');

    expect(layerWrapper.layer.getScaleOptions()).toEqual({ x: { type: 'quantize' } });
  });
});
