import type { IColorRamp } from '@antv/l7';
import { MappingLayer } from '../../adaptor/layer';
import { HeatmapLayerStyleOptions } from '../../types/layer';
import { ILayer } from '../../types';
import { HeatmapLayerOptions } from './types';

function getRampColors(style: HeatmapLayerStyleOptions): IColorRamp {
  const { colorsRamp } = style;
  const rampColors: IColorRamp = { colors: [], positions: [] };
  colorsRamp.forEach(({ color, position }) => {
    rampColors.colors.push(color);
    rampColors.positions.push(position);
  });
  return rampColors;
}

export function mappingLayer(layer: ILayer, options: HeatmapLayerOptions) {
  const { shape, size, style, state } = options;
  // mapping shape
  shape && MappingLayer.shape(layer, shape);

  // mapping size
  size && MappingLayer.size(layer, size);

  // mapping style
  if (style) {
    if ('colorsRamp' in style) {
      style.rampColors = getRampColors(style);
    }
    MappingLayer.style(layer, style);
  }

  // mapping state
  state && MappingLayer.state(layer, state);
}
