import { Map as MapboxglMap } from 'mapbox-gl';
import { IAMapInstance, IMapboxInstance } from '@antv/l7-maps/typings';
import { IStatusOptions, PositionName, ISourceCFG, MapStyle } from '@antv/l7-core';
import Source from '@antv/l7-source';
import { IStateAttribute } from './attr';
import { ILabelOptions } from './label';
import { IPopupOptions } from './popup';
import { ITooltipOptions } from './tooltip';
import { ILegendOptions } from './legend';
import { ILayerMenuControlOptions, IScaleControlOptions, IZoomControlOptions } from './control';

export { MapboxglMap, Source, IStatusOptions };

export type AMapInstance = AMap.Map & IAMapInstance;

export type MapboxInstance = MapboxglMap & IMapboxInstance;

export type MapInstance = AMapInstance | MapboxInstance;

/**
 * 地图图表类型
 */
export enum MapType {
  Point = 'point',
  Bubble = 'bubble',
  Scatter = 'scatter',
  PointCloud = 'pointCloud',
  Icon = 'icon',
  Clustere = 'clustere',
  Heat = 'heat',
  HeatMap = 'heatMap',
  Grid = 'grid',
  Hexagon = 'hexagon',
  Line = 'line',
}

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
}

/**
 * 基础 options 配置
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
   * logo 配置
   */
  readonly logo?: boolean | ILogo;

  /**
   * 具体的数据
   */
  readonly source: ISource;

  /**
   * 是否自动缩放到图层范围，默认为 false
   */

  readonly autoFit?: boolean;

  /**
   * 交互反馈
   */
  readonly state?: IStateAttribute;

  /**
   * 主题，字符串或 object
   */
  readonly theme?: string | Record<string, any>;

  /**
   * 数据标签配置
   */
  readonly label?: false | ILabelOptions;

  // 组件相关
  /**
   * tooltip 配置项
   */
  readonly tooltip?: false | ITooltipOptions;

  /**
   * popup 配置项
   */
  readonly popup?: false | IPopupOptions;

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
