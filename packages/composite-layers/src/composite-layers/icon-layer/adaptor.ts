import { isUndefined } from '@antv/util';
import { DEFAULT_STATE } from './constants';
import { IconLayerOptions, IconLayerActiveOptions } from './types';

export const getDefaultState = (state?: IconLayerOptions['state']) => {
  return DEFAULT_STATE;
};
