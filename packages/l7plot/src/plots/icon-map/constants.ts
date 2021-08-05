import { deepAssign } from '../../utils';
import { DEFAULT_OPTIONS as POINT_DEFAULT_OPTIONS } from '../point-map/constants';
import { IconMapOptions } from './interface';

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<IconMapOptions> = deepAssign({}, POINT_DEFAULT_OPTIONS, {
  color: '#fff',
  size: 20,
});
