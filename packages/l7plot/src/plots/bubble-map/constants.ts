import { deepAssign } from '../../utils';
import { DEFAULT_OPTIONS as POINT_DEFAULT_OPTIONS } from '../point-map/constants';
import { BubbleMapOptions } from './interface';

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<BubbleMapOptions> = deepAssign({}, POINT_DEFAULT_OPTIONS, {});
