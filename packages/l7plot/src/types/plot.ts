import { IMapOptions, ISource } from './map';
import { IStateAttribute } from './attr';
import { ILabelOptions } from './label';

/**
 * 地图图表类型
 */
export enum MapType {
  Dot = 'dot',
  Bubble = 'bubble',
  Scatter = 'scatter',
  DotDensity = 'dotDensity',
  Icon = 'icon',
  Clustere = 'clustere',
  Heatmap = 'heatmap',
  Grid = 'grid',
  Hexagon = 'hexagon',
}

/**
 * 基础 plot options 配置
 */
export interface IPlotOptions extends IMapOptions {
  /**
   * 具体的数据
   */
  source: ISource;
  /**
   * 是否自动缩放到图层范围，默认为 false
   */
  autoFit?: boolean;
  /**
   * 交互反馈
   */
  state?: IStateAttribute;
  /**
   * 数据标签配置
   */
  label?: false | ILabelOptions;
}

/**
 * 高级 plot options 配置
 */
export interface IL7PlotOptions extends IMapOptions {
  plots?: any[];
  layers?: any[];
}
