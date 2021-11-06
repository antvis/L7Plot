import { MapOptions, SourceOptions } from './map';
import { LabelOptions } from './label';
import { LayerConfigType, PlotConfigType } from '../plot/types';

/**
 * 地图图表类型
 */
export enum PlotType {
  Dot = 'dot',
  DotDensity = 'dotDensity',
  Heatmap = 'heatmap',
  Grid = 'grid',
  Hexagon = 'hexagon',
  Area = 'area',
  Choropleth = 'choropleth',
}

/**
 * 基础 plot options 配置
 */
export interface PlotOptions extends MapOptions {
  /**
   * 具体的数据
   */
  source: SourceOptions;
  /**
   * 是否自动缩放到图层范围，默认为 false
   */
  autoFit?: boolean;
  /**
   * 数据标签配置
   */
  label?: false | LabelOptions;
}

/**
 * 高级 plot options 配置
 */
export interface L7PlotOptions extends MapOptions {
  /**
   * 支持使用已有的 plot
   */
  plots?: PlotConfigType[];
  /**
   * L7Plot 内置的的图层
   */
  layers?: LayerConfigType[];
}
