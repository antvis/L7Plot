import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { HeatmapOptions } from './types';

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<HeatmapOptions> = deepAssign({}, Plot.DefaultOptions, {
  source: {
    data: [],
    parser: {
      type: 'json',
      x: 'x',
      y: 'y',
    },
  },
});
