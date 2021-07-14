import { Map as MapboxglMap } from 'mapbox-gl';
import { IAMapInstance, IMapboxInstance } from '@antv/l7-maps/typings';
import { IMapConfig as MapConfig, IStatusOptions, PositionName, ISourceCFG } from '@antv/l7-core';
import Source from '@antv/l7-source';
import { ColorsAttr, IStateAttribute } from './attr';
import { ILabelOptions } from './label';
import { IPopupOptions } from './popup';
import { ITooltipOptions } from './tooltip';
import { ILegendControlOption } from './legend';
import { ILayerMenuControlOption, IScaleControlOption, IZoomControlOption } from './control';

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
  Symbol = 'symbol',
  Clustere = 'clustere',
  Heat = 'heatmap',
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
export interface IMapConfig extends Omit<MapConfig, 'id'> {
  type?: 'amap' | 'mapbox';
}

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
   * 画布宽度
   */
  readonly width?: number;

  /**
   * 画布高度
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
   * 是否自动缩放到图层范围，默认为 false
   */

  readonly autoFit?: boolean;

  /**
   * 具体的数据
   */
  readonly source: ISource;

  /**
   * 交互反馈
   */
  readonly state?: IStateAttribute;

  /**
   * 颜色色板
   */
  readonly colors?: ColorsAttr;

  /**
   * 主题，字符串或 object
   */
  readonly theme?: string | Record<string, unknown>;

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
  readonly legend?: false | ILegendControlOption;
  /**
   * zoom 配置
   */
  readonly zoom?: false | IZoomControlOption;
  /**
   * scale 配置
   */
  readonly scale?: false | IScaleControlOption;
  /**
   * layerMenu 配置
   */
  readonly layerMenu?: false | ILayerMenuControlOption;
}
