import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { GridOptions } from './types';

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<GridOptions> = deepAssign({}, Plot.DefaultOptions, {
  source: {
    data: [],
    parser: {
      type: 'json',
      x: 'x',
      y: 'y',
    },
    aggregation: {
      type: 'grid',
      radius: 15000,
      method: 'sum',
    },
  },
});
