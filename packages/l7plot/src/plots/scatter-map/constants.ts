import { deepAssign } from '../../utils';
import { DEFAULT_OPTIONS as POINT_DEFAULT_OPTIONS } from '../point-map/constants';
import { ScatterMapOptions } from './interface';

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<ScatterMapOptions> = deepAssign({}, POINT_DEFAULT_OPTIONS, {
  shape: 'circle',
  size: 5,
});
