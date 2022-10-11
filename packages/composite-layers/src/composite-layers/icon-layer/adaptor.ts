import { DEFAULT_STATE } from './constants';
import { IconLayerOptions } from './types';

export const getDefaultState = (state?: IconLayerOptions['state']) => {
  return {
    ...DEFAULT_STATE,
    ...state,
  };
};
