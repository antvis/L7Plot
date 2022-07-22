import { DEFAULT_CLUSTER_OPTIONS, DEFAULT_FIELD_GETTER_OPTIONS } from './data-service/constants';
import { TrafficFlowLayerOptions } from './types';

export const DEFAULT_OVERFLOW_LIMIT = 5000;

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<TrafficFlowLayerOptions> = {
  visible: true,
  pointConfig: {
    shape: 'circle',
  },
  lineConfig: {
    shape: 'halfLine',
  },
  cluster: DEFAULT_CLUSTER_OPTIONS,
  fieldGetter: DEFAULT_FIELD_GETTER_OPTIONS,
  overflowLimit: DEFAULT_OVERFLOW_LIMIT,
};

/**
 * 点图层id
 */
export const LOCATION_LAYER_ID = 'locationLayer';

/**
 * 线图层id
 */
export const FLOW_LAYER_ID = 'flowLayer';
