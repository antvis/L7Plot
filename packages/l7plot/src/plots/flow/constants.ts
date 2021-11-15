import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { FlowOptions } from './types';

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<FlowOptions> = deepAssign({}, Plot.DefaultOptions, {
  source: {
    data: [],
    parser: {
      type: 'json',
    },
  },
});
