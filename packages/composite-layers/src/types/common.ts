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
import { Scene } from '@antv/l7-scene';

export { ILayer, ILayerConfig, ISourceCFG, BlendType, IImage, ITransform, ILegendSegmentItem, ILegendClassificaItem };

export type { Scene };

export type ScaleConfig = IScale;
export type ScaleConfigMap = IScaleOptions;
export type ValueOf<T> = T[keyof T];

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
