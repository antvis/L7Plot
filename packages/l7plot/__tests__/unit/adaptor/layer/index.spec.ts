import { getLayerStyleAttribute } from '../../../helper/layer';
import { DotLayer } from '../../../../src/layers/dot-layer';
import { Source } from '../../../../src/types';
import { DotLayerOptions } from '../../../../src/layers/dot-layer';

describe('mapping layer', () => {
  const source = new Source([], { parser: { type: 'json', x: 'x', y: 'y' } });

  it('mapping shape', () => {
    const layerWrapper = new DotLayer<DotLayerOptions>({
      source: source,
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

  it('mapping size', () => {
    const layerWrapper = new DotLayer<DotLayerOptions>({
      source: source,
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

  it('mapping color', () => {
    const layerWrapper = new DotLayer<DotLayerOptions>({
      source: source,
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

  it('mapping style', () => {
    const layerWrapper = new DotLayer({
      source: source,
      style: { opacity: 1, strokeWidth: 1, stroke: 'red' },
    });

    expect(layerWrapper.layer.type).toBe('PointLayer');

    expect(layerWrapper.layer['rawConfig']).toMatchObject({ opacity: 1, strokeWidth: 1, stroke: 'red' });
  });

  it('mapping state', () => {
    const layerWrapper = new DotLayer({
      source: source,
      state: { active: true, select: true },
    });

    expect(layerWrapper.layer.type).toBe('PointLayer');

    expect(layerWrapper.layer['needUpdateConfig'].enableHighlight).toBeTruthy();
    expect(layerWrapper.layer['needUpdateConfig'].enableSelect).toBeTruthy();
  });

  it('mapping rotate', () => {
    const layerWrapper = new DotLayer({
      source: source,
      // rotate: 45,
    });

    expect(layerWrapper.layer.type).toBe('PointLayer');

    // expect(getLayerStyleAttribute(layerWrapper.layer['pendingStyleAttributes'], 'rotate')).toEqual({
    //   attributeName: 'rotate',
    //   attributeField: 45,
    // });
  });

  it('mapping animate', () => {
    const layerWrapper = new DotLayer({
      source: source,
      animate: true,
    });

    expect(layerWrapper.layer.type).toBe('PointLayer');

    expect(layerWrapper.layer['needUpdateConfig'].animateOption.enable).toBeTruthy();
  });

  it('mapping scale', () => {
    const layerWrapper = new DotLayer({
      source: source,
      size: {
        field: 'x',
        value: [12, 14],
        scale: { type: 'quantize' },
      },
    });

    expect(layerWrapper.layer.type).toBe('PointLayer');

    expect(layerWrapper.layer.getScaleOptions()).toEqual({ x: { type: 'quantize' } });
  });
});
