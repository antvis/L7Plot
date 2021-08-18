import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { GridMapOptions } from './interface';

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<GridMapOptions> = deepAssign({}, Plot.DefaultOptions, {
  source: {
    data: [],
    parser: {
      type: 'json',
      x: 'x',
      y: 'y',
    },
    aggregation: {
      radius: 15000,
      type: 'sum',
    },
  },
  shape: 'square',
  color: '#5FD3A6',
  style: {
    coverage: 0.9,
    angle: 0,
    opacity: 1.0,
  },
});
