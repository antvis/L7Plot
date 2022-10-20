import type {
  Scene,
  ILayer,
  ILayerConfig,
  ISource,
  ISourceCFG,
  IScale,
  ILngLat,
  IImage,
  ITransform,
  ILegendSegmentItem,
  ILegendClassificaItem,
  ILegend,
} from '@antv/l7';
import { BlendType } from '@antv/l7';

export type {
  ILayer,
  ILayerConfig,
  ISource,
  ISourceCFG,
  IImage,
  ITransform,
  ILegendSegmentItem,
  ILegendClassificaItem,
  ILegend,
  Scene,
};

export { BlendType };

export type LayerBaseConfig = Omit<
  ILayerConfig,
  'size' | 'shape' | 'shape2d' | 'shape3d' | 'colors' | 'onHover' | 'onClick'
>;
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
