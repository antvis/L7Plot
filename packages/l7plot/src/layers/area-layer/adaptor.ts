import { isUndefined } from '@antv/util';
import { MappingLayer } from '../../adaptor/layer';
import { ILayer } from '../../types';
import { AreaLayerActiveOptions, AreaLayerOptions } from './types';

const defaultHighlightColor = '#2f54eb';

export const defaultLayerState: { active: Required<AreaLayerActiveOptions>; select: Required<AreaLayerActiveOptions> } =
  {
    active: {
      fill: false,
      stroke: defaultHighlightColor,
      lineWidth: 1.5,
      lineOpacity: 0.8,
    },
    select: {
      fill: false,
      stroke: defaultHighlightColor,
      lineWidth: 1.5,
      lineOpacity: 0.8,
    },
  };

export const getLayerState = (state?: AreaLayerOptions['state']) => {
  if (isUndefined(state)) {
    return defaultLayerState;
  }

  if (state.active === false) {
    defaultLayerState.active = Object.assign(defaultLayerState.active, { fill: false, stroke: false });
  } else if (typeof state.active === 'object') {
    if (state.active.fill === false) {
      defaultLayerState.active.fill = false;
    } else if (typeof state.active.fill === 'string') {
      defaultLayerState.active.fill = state.active.fill;
    }

    if (state.active.stroke === false) {
      defaultLayerState.active.stroke = false;
    } else if (typeof state.active.stroke === 'string') {
      defaultLayerState.active.stroke = state.active.stroke;
    }

    if (typeof state.active.lineWidth === 'number') {
      defaultLayerState.active.lineWidth = state.active.lineWidth;
    }
    if (typeof state.active.lineOpacity === 'number') {
      defaultLayerState.active.lineOpacity = state.active.lineOpacity;
    }
  }

  if (state.select === false) {
    defaultLayerState.select = Object.assign(defaultLayerState.select, { fill: false, stroke: false });
  } else if (typeof state.select === 'object') {
    if (state.select.fill === false) {
      defaultLayerState.select.fill = false;
    } else if (typeof state.select.fill === 'string') {
      defaultLayerState.select.fill = state.select.fill;
    }

    if (state.select.stroke === false) {
      defaultLayerState.select.stroke = false;
    } else if (typeof state.select.stroke === 'string') {
      defaultLayerState.select.stroke = state.select.stroke;
    }

    if (typeof state.select.lineWidth === 'number') {
      defaultLayerState.select.lineWidth = state.select.lineWidth;
    }
    if (typeof state.select.lineOpacity === 'number') {
      defaultLayerState.select.lineOpacity = state.select.lineOpacity;
    }
  }

  return defaultLayerState;
};

export function mappingLayer(
  layer: ILayer,
  strokeLayer: ILayer,
  highlightLayer: ILayer,
  selectFillLayer: ILayer,
  selectStrokeLayer: ILayer,
  options: AreaLayerOptions
): void {
  const { color, style, state } = options;
  const layerState = getLayerState(state);

  const fillState = {
    active: layerState.active.fill === false ? false : { color: layerState.active.fill },
    select: false,
  };
  const fillStyle = { opacity: style?.opacity };
  const fillBottomColor = style?.fillBottomColor;
  const strokeSize = style?.lineWidth;
  const strokeColor = style?.stroke;
  const strokeStyle = { opacity: style?.lineOpacity, dashArray: style?.lineDash, lineType: style?.lineType };

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
  // bottomColor
  fillBottomColor && layer.setBottomColor(fillBottomColor);

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
  if (layerState.active.stroke) {
    const color = layerState.active.stroke;
    const size = layerState.active.lineWidth || strokeSize;
    const style = { opacity: layerState.active.lineOpacity };
    // shape
    MappingLayer.shape(highlightLayer, 'line');
    // size
    size && MappingLayer.size(highlightLayer, size);
    // color
    color && MappingLayer.color(highlightLayer, color);
    // style
    style && MappingLayer.style(highlightLayer, style);
  }

  /**
   * 选中填充图层
   */
  if (layerState.select.fill) {
    const color = layerState.select.fill;
    // shape
    MappingLayer.shape(selectFillLayer, 'fill');
    // color
    color && MappingLayer.color(selectFillLayer, color);
    // style
    fillStyle && MappingLayer.style(selectFillLayer, fillStyle);
    // state
    MappingLayer.state(selectFillLayer, { select: false, active: false });
  }
  /**
   * 选中描边图层
   */
  if (layerState.select.stroke) {
    const color = layerState.select.stroke;
    const size = layerState.select.lineWidth || strokeSize;
    const style = { opacity: layerState.select.lineOpacity };
    // shape
    MappingLayer.shape(selectStrokeLayer, 'line');
    // size
    size && MappingLayer.size(selectStrokeLayer, size);
    // color
    color && MappingLayer.color(selectStrokeLayer, color);
    // style
    style && MappingLayer.style(selectStrokeLayer, style);
  }
}
