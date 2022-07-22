import { DEFAULT_CLUSTER_OPTIONS, DEFAULT_COLOR_1, DEFAULT_FIELD_GETTER_OPTIONS } from './data-service/constants';
import { TrafficFlowLayerOptions } from './types';

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<TrafficFlowLayerOptions> = {
  visible: true,
  pointColor: DEFAULT_COLOR_1,
  pointSize: [5, 30],
  pointConfig: {
    shape: 'circle',
  },
  lineColor: DEFAULT_COLOR_1,
  lineSize: [1, 10],
  lineConfig: {
    shape: 'halfLine',
  },
  cluster: DEFAULT_CLUSTER_OPTIONS,
  fieldGetter: DEFAULT_FIELD_GETTER_OPTIONS,
  overflowLimit: 5000,
};

/**
 * 点图层id
 */
export const LOCATION_LAYER_ID = 'locationLayer';

/**
 * 线图层id
 */
export const FLOW_LAYER_ID = 'flowLayer';
