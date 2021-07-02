import { ILayer } from '@antv/l7-core';
import { IColorRamp } from '@antv/l7-utils';
import { MappingLayer } from '../../adaptor/layer';
import { IHeatmapLayerStyleOptions } from '../../core/layer/interface';
import { IHeatmapLayerOptions } from './interface';

function getRampColors(style: IHeatmapLayerStyleOptions): IColorRamp {
  const { colorsRamp } = style;
  const rampColors: IColorRamp = { colors: [], positions: [] };
  colorsRamp.forEach(({ color, position }) => {
    rampColors.colors.push(color);
    rampColors.positions.push(position);
  });
  return rampColors;
}

export function mappingLayer(layer: ILayer, options: IHeatmapLayerOptions) {
  const { shape, color, size, style, state } = options;
  // mapping shape
  shape && MappingLayer.shape(layer, shape);

  // mapping size
  size && MappingLayer.size(layer, size);

  // mapping color
  color && MappingLayer.color(layer, color);

  // mapping style
  if (style) {
    if ('colorsRamp' in style) {
      style['rampColors'] = getRampColors(style);
    }
    MappingLayer.style(layer, style);
  }

  // mapping state
  state && MappingLayer.state(layer, state);
}
