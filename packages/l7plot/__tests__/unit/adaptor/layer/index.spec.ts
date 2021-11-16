import { getLayerStyleAttribute } from '../../../helper/layer';
import { DotLayer } from '../../../../src/layers/dot-layer';
import { Source } from '../../../../src/types';
import { DotLayerOptions } from '../../../../src/layers/dot-layer';

describe('mapping layer', () => {
  const source = new Source([], { parser: { type: 'json', x: 'x', y: 'y' } });

  it('mapping shape', () => {
    const plotLayer = new DotLayer<DotLayerOptions>({
      source: source,
      shape: 'circle',
    });

    expect(plotLayer.layer.type).toBe('PointLayer');

    expect(getLayerStyleAttribute(plotLayer.layer['pendingStyleAttributes'], 'shape')).toEqual({
      attributeName: 'shape',
      attributeField: 'circle',
    });

    plotLayer.update({
      shape: () => 'square',
    });
    expect(getLayerStyleAttribute(plotLayer.layer['pendingStyleAttributes'], 'shape')?.attributeValues).toBeDefined();

    plotLayer.update({
      shape: {
        field: 'x',
        value: ['circle', 'square'],
      },
    });
    expect(getLayerStyleAttribute(plotLayer.layer['pendingStyleAttributes'], 'shape')).toEqual({
      attributeName: 'shape',
      attributeField: 'x',
      attributeValues: ['circle', 'square'],
    });

    plotLayer.update({
      shape: {
        field: 'shape',
        value: ({ shape }) => shape,
      },
    });
    expect(getLayerStyleAttribute(plotLayer.layer['pendingStyleAttributes'], 'shape')?.attributeValues).toBeDefined();
  });

  it('mapping size', () => {
    const plotLayer = new DotLayer<DotLayerOptions>({
      source: source,
      size: 12,
    });

    expect(plotLayer.layer.type).toBe('PointLayer');

    expect(getLayerStyleAttribute(plotLayer.layer['pendingStyleAttributes'], 'size')).toEqual({
      attributeName: 'size',
      attributeField: 12,
    });

    plotLayer.update({
      size: () => 12,
    });
    expect(getLayerStyleAttribute(plotLayer.layer['pendingStyleAttributes'], 'size')?.attributeValues).toBeDefined();

    plotLayer.update({
      size: {
        field: 'x',
        value: [12, 14],
      },
    });
    expect(getLayerStyleAttribute(plotLayer.layer['pendingStyleAttributes'], 'size')).toEqual({
      attributeName: 'size',
      attributeField: 'x',
      attributeValues: [12, 14],
    });

    plotLayer.update({
      size: {
        field: 'size',
        value: ({ size }) => size,
      },
    });
    expect(getLayerStyleAttribute(plotLayer.layer['pendingStyleAttributes'], 'size')?.attributeValues).toBeDefined();
  });

  it('mapping color', () => {
    const plotLayer = new DotLayer<DotLayerOptions>({
      source: source,
      color: 'red',
    });

    expect(plotLayer.layer.type).toBe('PointLayer');

    expect(getLayerStyleAttribute(plotLayer.layer['pendingStyleAttributes'], 'color')).toEqual({
      attributeName: 'color',
      attributeField: 'red',
    });

    plotLayer.update({
      color: () => 'red',
    });
    expect(getLayerStyleAttribute(plotLayer.layer['pendingStyleAttributes'], 'color')?.attributeValues).toBeDefined();

    plotLayer.update({
      color: {
        field: 'x',
        value: ['red', 'blue'],
      },
    });
    expect(getLayerStyleAttribute(plotLayer.layer['pendingStyleAttributes'], 'color')).toEqual({
      attributeName: 'color',
      attributeField: 'x',
      attributeValues: ['red', 'blue'],
    });

    plotLayer.update({
      color: {
        field: 'color',
        value: ({ color }) => color,
      },
    });
    expect(getLayerStyleAttribute(plotLayer.layer['pendingStyleAttributes'], 'color')?.attributeValues).toBeDefined();
  });

  it('mapping style', () => {
    const plotLayer = new DotLayer({
      source: source,
      style: { opacity: 1, strokeWidth: 1, stroke: 'red' },
    });

    expect(plotLayer.layer.type).toBe('PointLayer');

    expect(plotLayer.layer['rawConfig']).toMatchObject({ opacity: 1, strokeWidth: 1, stroke: 'red' });
  });

  it('mapping state', () => {
    const plotLayer = new DotLayer({
      source: source,
      state: { active: true, select: true },
    });

    expect(plotLayer.layer.type).toBe('PointLayer');

    expect(plotLayer.layer['needUpdateConfig'].enableHighlight).toBeTruthy();
    expect(plotLayer.layer['needUpdateConfig'].enableSelect).toBeTruthy();
  });

  it('mapping rotate', () => {
    const plotLayer = new DotLayer({
      source: source,
      // rotate: 45,
    });

    expect(plotLayer.layer.type).toBe('PointLayer');

    // expect(getLayerStyleAttribute(plotLayer.layer['pendingStyleAttributes'], 'rotate')).toEqual({
    //   attributeName: 'rotate',
    //   attributeField: 45,
    // });
  });

  it('mapping animate', () => {
    const plotLayer = new DotLayer({
      source: source,
      animate: true,
    });

    expect(plotLayer.layer.type).toBe('PointLayer');

    expect(plotLayer.layer['needUpdateConfig'].animateOption.enable).toBeTruthy();
  });

  it('mapping scale', () => {
    const plotLayer = new DotLayer({
      source: source,
      size: {
        field: 'x',
        value: [12, 14],
        scale: { type: 'quantize' },
      },
    });

    expect(plotLayer.layer.type).toBe('PointLayer');

    expect(plotLayer.layer.getScaleOptions()).toEqual({ x: { type: 'quantize' } });
  });
});
