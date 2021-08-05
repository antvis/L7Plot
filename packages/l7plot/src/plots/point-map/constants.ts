import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { PointMapOptions } from './interface';

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<PointMapOptions> = deepAssign({}, Plot.DefaultOptions, {
  source: {
    data: [],
    parser: {
      type: 'json',
      x: 'x',
      y: 'y',
    },
  },
  shape: 'circle',
  size: 12,
  color: '#5FD3A6',
});

export const POINT_LAYER_OPTIONS_KEYS = ['autoFit', 'shape', 'color', 'size', 'style', 'state', 'animate'];
export const LABEL_LAYER_OPTIONS_KEYS = ['label'];
