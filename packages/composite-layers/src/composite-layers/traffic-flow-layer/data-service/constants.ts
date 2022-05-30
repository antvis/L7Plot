import { ClusterOptions, FieldGetter, ScaleType } from './types';
import { scaleLinear, scaleLog, scalePow, scaleQuantize, scaleQuantile, scaleSqrt } from 'd3-scale';

/**
 * 默认颜色配置
 */
export const DEFAULT_COLOR_1: [string, string] = ['#045275', '#f7feae'];

/**
 * 默认聚合配置
 */
export const DEFAULT_CLUSTER_OPTIONS: ClusterOptions = {
  zoomStep: 1,
  clusterType: 'HCA',
};

/**
 * 默认字段获取配置
 */
export const DEFAULT_FIELD_GETTER_OPTIONS: FieldGetter = {
  fromLng: 'fromLng',
  fromLat: 'fromLat',
  toLng: 'toLng',
  toLat: 'toLat',
  weight: 'weight',
};

export const SCALE_TYPE_MAP: Record<ScaleType, any> = {
  linear: scaleLinear,
  sqrt: scaleSqrt,
  log: scaleLog,
  pow: scalePow,
  quantile: scaleQuantile,
  quantize: scaleQuantize,
};
