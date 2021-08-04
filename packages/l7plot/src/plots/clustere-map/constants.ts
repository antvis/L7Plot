import { deepAssign } from '../../utils';
import { DEFAULT_OPTIONS as POINT_DEFAULT_OPTIONS } from '../point-map/constants';
import { ClustereMapOptions } from './interface';

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<ClustereMapOptions> = deepAssign({}, POINT_DEFAULT_OPTIONS, {
  source: {
    data: [],
    parser: {
      type: 'json',
      x: 'x',
      y: 'y',
    },
    cluster: true,
    clusterOption: {
      radius: 40,
      minZoom: 0,
      maxZoom: 20,
    },
  },
  shape: 'circle',
});
