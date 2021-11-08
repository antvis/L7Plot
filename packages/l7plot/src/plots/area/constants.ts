import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { AreaOptions } from './types';

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<AreaOptions> = deepAssign({}, Plot.DefaultOptions, {
  source: {
    data: { type: 'FeatureCollection', features: [] },
    parser: {
      type: 'geojson',
    },
  },
});
