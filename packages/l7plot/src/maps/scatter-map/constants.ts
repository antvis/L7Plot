import { deepAssign } from '../../utils';
import { DEFAULT_OPTIONS as POINT_DEFAULT_OPTIONS } from '../point-map/constants';

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS = deepAssign({}, POINT_DEFAULT_OPTIONS, {
  shape: 'circle',
  size: 5,
});
