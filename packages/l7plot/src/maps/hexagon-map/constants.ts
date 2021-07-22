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
    transforms: [
      {
        type: 'hexagon',
        size: 15000,
        method: 'sum',
      },
    ],
  },
  shape: 'hexagon',
  style: {
    coverage: 0.9,
    angle: 0,
    opacity: 1.0,
  },
});
