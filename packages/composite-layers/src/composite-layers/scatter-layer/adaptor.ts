import { isUndefined } from '@antv/util';
import { DEFAULT_STATE } from './constants';
import { ScatterLayerOptions } from './types';

export const getDefaultState = (state?: ScatterLayerOptions['state']) => {
  if (isUndefined(state)) {
    return DEFAULT_STATE;
  }

  if (state.active === false) {
    DEFAULT_STATE.active = Object.assign(DEFAULT_STATE.active, { fillColor: false, strokeColor: false });
  } else if (typeof state.active === 'object') {
    if (state.active.fillColor === false) {
      DEFAULT_STATE.active.fillColor = false;
    } else if (typeof state.active.fillColor === 'string') {
      DEFAULT_STATE.active.fillColor = state.active.fillColor;
    }

    if (state.active.strokeColor === false) {
      DEFAULT_STATE.active.strokeColor = false;
    } else if (typeof state.active.strokeColor === 'string') {
      DEFAULT_STATE.active.strokeColor = state.active.strokeColor;
    }

    if (typeof state.active.lineWidth === 'number') {
      DEFAULT_STATE.active.lineWidth = state.active.lineWidth;
    }
    if (typeof state.active.lineOpacity === 'number') {
      DEFAULT_STATE.active.lineOpacity = state.active.lineOpacity;
    }
  }

  if (state.select === false) {
    DEFAULT_STATE.select = Object.assign(DEFAULT_STATE.select, { fillColor: false, strokeColor: false });
  } else if (typeof state.select === 'object') {
    if (state.select.fillColor === false) {
      DEFAULT_STATE.select.fillColor = false;
    } else if (typeof state.select.fillColor === 'string') {
      DEFAULT_STATE.select.fillColor = state.select.fillColor;
    }

    if (state.select.strokeColor === false) {
      DEFAULT_STATE.select.strokeColor = false;
    } else if (typeof state.select.strokeColor === 'string') {
      DEFAULT_STATE.select.strokeColor = state.select.strokeColor;
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
