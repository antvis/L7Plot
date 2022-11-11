import { Source } from '@antv/l7';
import { getLayerStyleAttribute } from '../../../helper/layer';
import { ColumnLayer } from '../../../../src/layers/column-layer';

describe('column layer', () => {
  const layer = new ColumnLayer({
    source: new Source([], { parser: { type: 'json', x: 'x', y: 'y' } }),
    size: [12, 12],
    color: '#fff',
  });

  it('type', () => {
    expect(layer.type).toBe('columnLayer');
    expect(layer.layer.type).toBe('PointLayer');
  });

  it('size', () => {
    expect(getLayerStyleAttribute(layer.layer['pendingStyleAttributes'], 'size')).toEqual({
      attributeName: 'size',
      attributeField: [12, 12],
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
      attributeField: 'cylinder',
    });
  });
});
