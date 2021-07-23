import { MapWrapper } from '../../core/map';
import { deepAssign } from '../../utils';

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS = deepAssign({}, MapWrapper.DefaultOptions, {
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
  shape: 'hexagon',
  style: {
    coverage: 0.9,
    angle: 0,
    opacity: 1.0,
  },
});
