import {
  ILayer,
  ILayerConfig,
  ISourceCFG,
  IScale,
  IScaleOptions,
  ILngLat,
  Bounds,
  BlendType,
  IImage,
  ITransform,
} from '@antv/l7-core';
import { Scene } from '@antv/l7-scene';

export { ILayer, ILayerConfig, ISourceCFG, IScale, IScaleOptions, ILngLat, Bounds, BlendType, IImage, ITransform };

export type { Scene };

export type ValueOf<T> = T[keyof T];

export interface IEvent {
  // 事件类型
  type: string;
  // 事件源
  target?: any;
  [key: string]: any;
}

export interface IMouseEvent extends IEvent {
  x: number;
  y: number;
  type: string;
  lngLat: ILngLat;
  feature: any;
  featureId: number;
}
