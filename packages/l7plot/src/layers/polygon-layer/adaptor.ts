import { MappingLayer } from '../../adaptor/layer';
import { ILayer } from '../../types';
import { IPolygonLayerOptions } from './interface';

export function mappingLayer(layer: ILayer, options: IPolygonLayerOptions): void {
  const { shape, color, size, style, state } = options;
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
}
