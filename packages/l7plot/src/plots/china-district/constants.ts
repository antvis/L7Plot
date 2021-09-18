import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { ChinaDistrictOptions } from './interface';

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<ChinaDistrictOptions> = deepAssign({}, Plot.DefaultOptions, {
  source: {
    data: [],
    parser: {
      type: 'geojson',
    },
  },
});
