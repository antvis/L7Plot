import { MappingLayer } from '../../adaptor/layer';
import { ILayer } from '../../types';
import { TextLayerOptions } from './types';

export function mappingLayer(layer: ILayer, options: TextLayerOptions): void {
  const {
    field,
    content,
    // rotate,
    style = {},
    state,
  } = options;
  const { fontSize, fill } = style;
  // mapping shape
  const txet = field ? field : content ? content : '';
  const shape = { field: txet, value: 'text' };
  MappingLayer.shape(layer, shape);

  // mapping size
  fontSize && MappingLayer.size(layer, fontSize);

  // mapping color
  fill && MappingLayer.color(layer, fill);

  // mapping style
  style && MappingLayer.style(layer, style);

  // mapping rotate
  // rotate && MappingLayer.rotate(layer, rotate);

  // mapping state
  state && MappingLayer.state(layer, state);
}
