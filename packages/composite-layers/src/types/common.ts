import {
  ILayer,
  ILayerConfig,
  ISource,
  ISourceCFG,
  IScale,
  ILngLat,
  BlendType,
  IImage,
  ITransform,
  ILegendSegmentItem,
  ILegendClassificaItem,
} from '@antv/l7-core';
import type { Scene } from '@antv/l7-scene';

export {
  ILayer,
  ILayerConfig,
  ISource,
  ISourceCFG,
  BlendType,
  IImage,
  ITransform,
  ILegendSegmentItem,
  ILegendClassificaItem,
};

export { Scene };

export type LayerBaseConfig = Omit<ILayerConfig, 'size' | 'shape' | 'shape2d' | 'shape3d' | 'colors'>;
export type ValueOf<T> = T[keyof T];
export type ScaleConfig = IScale;

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
