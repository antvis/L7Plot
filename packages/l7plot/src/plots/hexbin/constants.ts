import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS = deepAssign({}, Plot.DefaultOptions, {
  source: {
    data: [],
    parser: {
      type: 'json',
      x: 'x',
      y: 'y',
    },
    aggregation: {
      type: 'hexagon',
      radius: 15000,
      method: 'sum',
    },
  },
});
