import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { PathOptions } from './types';

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<PathOptions> = deepAssign({}, Plot.DefaultOptions, {
  source: {
    data: [],
    parser: {
      type: 'geojson',
    },
  },
});
