import { isUndefined } from '@antv/util';
import { MappingLayer } from '../../adaptor/layer';
import { ILayer } from '../../types';
import { AreaLayerActiveOptions, AreaLayerOptions } from './types';

const defaultHighlightColor = '#2f54eb';

const defaultState: { active: Required<AreaLayerActiveOptions>; select: Required<AreaLayerActiveOptions> } = {
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

export const getDefaultState = (state?: AreaLayerOptions['state']) => {
  if (isUndefined(state)) {
    return defaultState;
  }

  if (state.active === false) {
    defaultState.active = Object.assign(defaultState.active, { fill: false, stroke: false });
  } else if (typeof state.active === 'object') {
    if (state.active.fill === false) {
      defaultState.active.fill = false;
    } else if (typeof state.active.fill === 'string') {
      defaultState.active.fill = state.active.fill;
    }

    if (state.active.stroke === false) {
      defaultState.active.stroke = false;
    } else if (typeof state.active.stroke === 'string') {
      defaultState.active.stroke = state.active.stroke;
    }

    if (typeof state.active.lineWidth === 'number') {
      defaultState.active.lineWidth = state.active.lineWidth;
    }
    if (typeof state.active.lineOpacity === 'number') {
      defaultState.active.lineOpacity = state.active.lineOpacity;
    }
  }

  if (state.select === false) {
    defaultState.select = Object.assign(defaultState.select, { fill: false, stroke: false });
  } else if (typeof state.select === 'object') {
    if (state.select.fill === false) {
      defaultState.select.fill = false;
    } else if (typeof state.select.fill === 'string') {
      defaultState.select.fill = state.select.fill;
    }

    if (state.select.stroke === false) {
      defaultState.select.stroke = false;
    } else if (typeof state.select.stroke === 'string') {
      defaultState.select.stroke = state.select.stroke;
    }

    if (typeof state.select.lineWidth === 'number') {
      defaultState.select.lineWidth = state.select.lineWidth;
    }
    if (typeof state.select.lineOpacity === 'number') {
      defaultState.select.lineOpacity = state.select.lineOpacity;
    }
  }

  return defaultState;
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
  const defaultState = getDefaultState(state);

  const fillState = {
    active: defaultState.active.fill === false ? false : { color: defaultState.active.fill },
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
  if (defaultState.active.stroke) {
    const color = defaultState.active.stroke;
    const size = defaultState.active.lineWidth || strokeSize;
    const style = { opacity: defaultState.active.lineOpacity };
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
  if (defaultState.select.fill) {
    const color = defaultState.select.fill;
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
  if (defaultState.select.stroke) {
    const color = defaultState.select.stroke;
    const size = defaultState.select.lineWidth || strokeSize;
    const style = { opacity: defaultState.select.lineOpacity };
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
