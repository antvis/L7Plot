import { MappingAttribute } from '../../adaptor/attribute';
import { ILayer } from '../../types';
import { DotLayerOptions } from './types';

export function mappingLayersAttr(layer: ILayer, options: DotLayerOptions): void {
  const { shape, color, size, style, state, animate } = options;
  // mapping shape
  shape && MappingAttribute.shape(layer, shape);

  // mapping size
  size && MappingAttribute.size(layer, size);

  // mapping color
  color && MappingAttribute.color(layer, color);

  // mapping style
  style && MappingAttribute.style(layer, style);

  // mapping state
  state && MappingAttribute.state(layer, state);

  // mapping animate
  animate && MappingAttribute.animate(layer, animate);
}
