import {
  ILayer,
  ILayerConfig,
  ISourceCFG,
  IScale,
  IScaleOptions,
  ILngLat,
  BlendType,
  IImage,
  ITransform,
  ILegendSegmentItem,
  ILegendClassificaItem,
} from '@antv/l7-core';
import type { Scene } from '@antv/l7-scene';
import type Source from '@antv/l7-source';

export { ILayer, ILayerConfig, ISourceCFG, BlendType, IImage, ITransform, ILegendSegmentItem, ILegendClassificaItem };

export { Scene, Source };

export type ValueOf<T> = T[keyof T];
export type ScaleConfig = IScale;
export type ScaleConfigMap = IScaleOptions;

/**
 * 图层混合配置
 */
export type LayerBlend = keyof typeof BlendType;

export interface Event {
  // 事件类型
  type: string;
  // 事件源
  target?: any;
  [key: string]: any;
}

export interface MouseEvent extends Event {
  x: number;
  y: number;
  type: string;
  lngLat: ILngLat;
  feature: any;
  featureId: number;
}
