import { MappingLayer } from '../../adaptor/layer';
import { ILayer } from '../../types';
import { IDotLayerOptions } from './interface';

export function mappingLayer(layer: ILayer, options: IDotLayerOptions): void {
  const { shape, color, size, style, state, animate } = options;
  // mapping shape
  shape && MappingLayer.shape(layer, shape);

  // mapping size
  size && MappingLayer.size(layer, size);

  // mapping color
  color && MappingLayer.color(layer, color);

  // mapping style
  style && MappingLayer.style(layer, style);

  // mapping state
  state && MappingLayer.state(layer, state);

  // mapping animate
  animate && MappingLayer.animate(layer, animate);
}
