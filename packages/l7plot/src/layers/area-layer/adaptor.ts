import { MappingLayer } from '../../adaptor/layer';
import { ILayer } from '../../types';
import { AreaLayerOptions } from './types';

export function mappingLayer(
  layer: ILayer,
  strokeLayer: ILayer,
  highlightLayer: ILayer,
  options: AreaLayerOptions
): void {
  const { color, style, state } = options;
  const fillState = {
    active: typeof state?.active === 'object' ? { color: state.active.fill } : state?.active,
    select: typeof state?.select === 'object' ? { color: state.select.fill } : state?.select,
  };
  const fillStyle = { opacity: style?.opacity };
  const strokeSize = style?.lineWidth;
  const strokeColor = style?.stroke;
  const strokeStyle = { opacity: style?.lineOpacity, dashArray: style?.lineDash, lineType: style?.lineType };
  const highlightColor = typeof state?.active === 'object' ? state.active.stroke : '#2f54eb';
  const highlightSize = typeof state?.active === 'object' ? state.active.lineWidth : strokeSize;

  /**
   * 映射填充面图层
   */
  // shape
  MappingLayer.shape(layer, 'fill');
  // color
  color && MappingLayer.color(layer, color);
  // style
  fillStyle && MappingLayer.style(layer, fillStyle);
  // state
  fillState && MappingLayer.state(layer, fillState);

  /**
   * 描边图层
   */
  // shape
  MappingLayer.shape(strokeLayer, 'line');
  // size
  strokeSize && MappingLayer.size(strokeLayer, strokeSize);
  // color
  strokeColor && MappingLayer.color(strokeLayer, strokeColor);
  // style
  strokeStyle && MappingLayer.style(strokeLayer, strokeStyle);

  /**
   * 高亮图层
   */
  // shape
  MappingLayer.shape(highlightLayer, 'line');
  // size
  highlightSize && MappingLayer.size(highlightLayer, highlightSize);
  // color
  highlightColor && MappingLayer.color(highlightLayer, highlightColor);
  // style
  strokeStyle && MappingLayer.style(highlightLayer, strokeStyle);
}
