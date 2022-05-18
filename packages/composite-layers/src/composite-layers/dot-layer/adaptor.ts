import { isUndefined } from '@antv/util';
import { DEFAULT_STATE } from './constants';
import { DotLayerOptions } from './types';

export const getDefaultState = (state?: DotLayerOptions['state']) => {
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
