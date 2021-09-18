import { MappingLayer } from '../../adaptor/layer';
import { ILayer } from '../../types';
import { IPrismLayerOptions } from './interface';

export function mappingLayer(layer: ILayer, options: IPrismLayerOptions): void {
  const { color, size, style, state } = options;
  // mapping shape
  MappingLayer.shape(layer, 'extrude');

  // mapping size
  size && MappingLayer.size(layer, size);

  // mapping color
  color && MappingLayer.color(layer, color);

  // mapping style
  style && MappingLayer.style(layer, style);

  // mapping state
  state && MappingLayer.state(layer, state);
}
