import { Map as MapboxglMap } from 'mapbox-gl';
import { IAMapInstance, IMapboxInstance } from '@antv/l7-maps/typings';
import { IStatusOptions, PositionName, ISourceCFG, MapStyle } from '@antv/l7-core';
import Source from '@antv/l7-source';
import { TooltipOptions } from './tooltip';
import { LegendOptions } from './legend';
import { LayerMenuControlOptions, ScaleControlOptions, ZoomControlOptions } from './control';
import { GridAggregation } from './attr';

export { MapboxglMap, Source };

export type StatusOptions = IStatusOptions;
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
export type MapConfig = {
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

  [key: string]: any;
};

/**
 * 地图更新配置
 */
export type UpdateMapConfig = Pick<MapConfig, 'center' | 'pitch' | 'rotation' | 'zoom' | 'style'>;

/**
 * logo 配置
 */
export type Logo = {
  position?: PositionName;
  visible?: boolean;
};

/**
 * 数据配置
 */
export interface SourceOptions extends ISourceCFG {
  data: any;
  /**
   * 网格聚合
   */
  aggregation?: GridAggregation;
}

/**
 * 基础 map options 配置
 */
export interface MapOptions {
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
  readonly map?: MapConfig;

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
  readonly logo?: boolean | Logo;

  /**
   * 主题，string 或 object
   */
  readonly theme?: string | Record<string, any>;

  // 组件相关
  /**
   * tooltip 配置项
   */
  readonly tooltip?: false | TooltipOptions;

  /**
   * popup 配置项
   */
  // readonly popup?: false | PopupOptions;

  /**
   * 图例 legend 配置项
   */
  readonly legend?: false | LegendOptions;
  /**
   * zoom 配置
   */
  readonly zoom?: false | ZoomControlOptions;
  /**
   * scale 配置
   */
  readonly scale?: false | ScaleControlOptions;
  /**
   * layerMenu 配置
   */
  readonly layerMenu?: false | LayerMenuControlOptions;
}
