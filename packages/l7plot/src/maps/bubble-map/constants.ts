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
    },
  },
  shape: 'circle',
  size: 12,
  color: '#5FD3A6',
});
