import { isUndefined } from '@antv/util';
import { MappingAttribute } from '../../adaptor/attribute';
import { ILayer } from '../../types';
import { DEFAULT_STATE } from './constants';
import { AreaLayerOptions } from './types';

export const getDefaultState = (state?: AreaLayerOptions['state']) => {
  if (isUndefined(state)) {
    return DEFAULT_STATE;
  }

  if (state.active === false) {
    DEFAULT_STATE.active = Object.assign(DEFAULT_STATE.active, { fill: false, stroke: false });
  } else if (typeof state.active === 'object') {
    if (state.active.fill === false) {
      DEFAULT_STATE.active.fill = false;
    } else if (typeof state.active.fill === 'string') {
      DEFAULT_STATE.active.fill = state.active.fill;
    }

    if (state.active.stroke === false) {
      DEFAULT_STATE.active.stroke = false;
    } else if (typeof state.active.stroke === 'string') {
      DEFAULT_STATE.active.stroke = state.active.stroke;
    }

    if (typeof state.active.lineWidth === 'number') {
      DEFAULT_STATE.active.lineWidth = state.active.lineWidth;
    }
    if (typeof state.active.lineOpacity === 'number') {
      DEFAULT_STATE.active.lineOpacity = state.active.lineOpacity;
    }
  }

  if (state.select === false) {
    DEFAULT_STATE.select = Object.assign(DEFAULT_STATE.select, { fill: false, stroke: false });
  } else if (typeof state.select === 'object') {
    if (state.select.fill === false) {
      DEFAULT_STATE.select.fill = false;
    } else if (typeof state.select.fill === 'string') {
      DEFAULT_STATE.select.fill = state.select.fill;
    }

    if (state.select.stroke === false) {
      DEFAULT_STATE.select.stroke = false;
    } else if (typeof state.select.stroke === 'string') {
      DEFAULT_STATE.select.stroke = state.select.stroke;
    }

    if (typeof state.select.lineWidth === 'number') {
      DEFAULT_STATE.select.lineWidth = state.select.lineWidth;
    }
    if (typeof state.select.lineOpacity === 'number') {
      DEFAULT_STATE.select.lineOpacity = state.select.lineOpacity;
    }
  }

  return DEFAULT_STATE;
};

export function mappingLayersAttr(
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
  MappingAttribute.shape(layer, 'fill');
  // color
  color && MappingAttribute.color(layer, color);
  // style
  fillStyle && MappingAttribute.style(layer, fillStyle);
  // state
  fillState && MappingAttribute.state(layer, fillState);
  // bottomColor
  fillBottomColor && layer.setBottomColor(fillBottomColor);

  /**
   * 描边图层
   */
  // shape
  MappingAttribute.shape(strokeLayer, 'line');
  // size
  strokeSize && MappingAttribute.size(strokeLayer, strokeSize);
  // color
  strokeColor && MappingAttribute.color(strokeLayer, strokeColor);
  // style
  strokeStyle && MappingAttribute.style(strokeLayer, strokeStyle);

  /**
   * 高亮图层
   */
  if (defaultState.active.stroke) {
    const color = defaultState.active.stroke;
    const size = defaultState.active.lineWidth || strokeSize;
    const style = { opacity: defaultState.active.lineOpacity };
    // shape
    MappingAttribute.shape(highlightLayer, 'line');
    // size
    size && MappingAttribute.size(highlightLayer, size);
    // color
    color && MappingAttribute.color(highlightLayer, color);
    // style
    style && MappingAttribute.style(highlightLayer, style);
  }

  /**
   * 选中填充图层
   */
  if (defaultState.select.fill) {
    const color = defaultState.select.fill;
    // shape
    MappingAttribute.shape(selectFillLayer, 'fill');
    // color
    color && MappingAttribute.color(selectFillLayer, color);
    // style
    fillStyle && MappingAttribute.style(selectFillLayer, fillStyle);
    // state
    MappingAttribute.state(selectFillLayer, { select: false, active: false });
  }
  /**
   * 选中描边图层
   */
  if (defaultState.select.stroke) {
    const color = defaultState.select.stroke;
    const size = defaultState.select.lineWidth || strokeSize;
    const style = { opacity: defaultState.select.lineOpacity };
    // shape
    MappingAttribute.shape(selectStrokeLayer, 'line');
    // size
    size && MappingAttribute.size(selectStrokeLayer, size);
    // color
    color && MappingAttribute.color(selectStrokeLayer, color);
    // style
    style && MappingAttribute.style(selectStrokeLayer, style);
  }
}
