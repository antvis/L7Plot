import { DEFAULT_CLUSTER_OPTIONS, DEFAULT_FIELD_GETTER_OPTIONS } from './data-service/constants';
import { TrafficFlowLayerOptions } from './types';

export const DEFAULT_OVERFLOW_LIMIT = 5000;

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<TrafficFlowLayerOptions> = {
  visible: true,
  pointConfig: {
    color: {
      field: 'weight',
      value: ['rgb(0,69,105)', '#f7feae'],
    },
    size: {
      field: 'weight',
      value: [5, 20],
    },
    shape: 'circle',
    style: {
      stroke: '#fff',
      strokeWidth: 1,
      opacity: 1,
    },
  },
  lineConfig: {
    color: {
      field: 'weight',
      value: ['rgba(0,69,105,0.4)', '#f7feae'],
    },
    size: {
      field: 'weight',
      value: [2, 8],
    },
    shape: 'halfLine',
    style: {
      arrow: {
        enable: true,
        arrowWidth: 3,
        arrowHeight: 2,
        tailWidth: 1,
      },
    },
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
