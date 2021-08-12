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
  type: string;
  target?: any;
  [key: string]: any;
}
