import { Map as MapboxglMap } from 'mapbox-gl';
import { IAMapInstance, IMapboxInstance } from '@antv/l7-maps/typings';
import { IStatusOptions, PositionName, ISourceCFG, MapStyle } from '@antv/l7-core';
import Source from '@antv/l7-source';
import { ITooltipOptions } from './tooltip';
import { ILegendOptions } from './legend';
import { ILayerMenuControlOptions, IScaleControlOptions, IZoomControlOptions } from './control';
import { IGridAggregation } from './attr';

export { MapboxglMap, Source, IStatusOptions };

export type AMapInstance = AMap.Map & IAMapInstance;

export type MapboxInstance = MapboxglMap & IMapboxInstance;

export type MapInstance = AMapInstance | MapboxInstance;

/**
 * 底图类型
 */
export enum BaseMapType {
  Amap = 'amap',
  Mapbox = 'mapbox',
}

/**
 * 地图配置
 */
export interface IMapConfig {
  /**
   * 底图类型
   */
  type?: 'amap' | 'mapbox';
  /**
   * 地图
   */
  token?: string;
  /**
   * 中心点
   */
  center?: [number, number];
  /**
   * 地图倾角
   */
  pitch?: number;
  /**
   * 地图旋转角度
   */
  rotation?: number;
  /**
   * 缩放等级
   */
  zoom?: number;
  /**
   * 底图样式
   */
  style?: MapStyle;
  /**
   * 最小缩放等级
   */
  minZoom?: number;
  /**
   * 最大缩放等级
   */
  maxZoom?: number;
}

/**
 * 地图更新配置
 */
export type UpdateMapConfig = Pick<IMapConfig, 'center' | 'pitch' | 'rotation' | 'zoom' | 'style'>;

/**
 * logo 配置
 */
export interface ILogo {
  position?: PositionName;
  visible?: boolean;
}

/**
 * 数据配置
 */
export interface ISource extends ISourceCFG {
  data: any;
  /**
   * 网格聚合
   */
  aggregation?: IGridAggregation;
}

/**
 * 基础 map options 配置
 */
export interface IMapOptions {
  // 地图容器基本配置
  /**
   * 容器宽度
   */
  readonly width?: number;

  /**
   * 容器高度
   */
  readonly height?: number;

  // 通用数据配置
  /**
   * 地图配置
   */
  readonly map?: IMapConfig;

  /**
   * 是否开启抗锯齿
   */
  readonly antialias?: boolean;
  /**
   * 是否保留缓冲区数据
   */
  readonly preserveDrawingBuffer?: boolean;
  /**
   * logo 配置
   */
  readonly logo?: boolean | ILogo;

  /**
   * 主题，string 或 object
   */
  readonly theme?: string | Record<string, any>;

  // 组件相关
  /**
   * tooltip 配置项
   */
  readonly tooltip?: false | ITooltipOptions;

  /**
   * popup 配置项
   */
  // readonly popup?: false | IPopupOptions;

  /**
   * 图例 legend 配置项
   */
  readonly legend?: false | ILegendOptions;
  /**
   * zoom 配置
   */
  readonly zoom?: false | IZoomControlOptions;
  /**
   * scale 配置
   */
  readonly scale?: false | IScaleControlOptions;
  /**
   * layerMenu 配置
   */
  readonly layerMenu?: false | ILayerMenuControlOptions;
}
