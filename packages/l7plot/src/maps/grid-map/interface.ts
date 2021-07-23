import { ISourceCFG } from '@antv/l7-core';
import { IGridHeatmapLayerStyleOptions, heatmapShape2d, heatmapShape3d } from '../../core/layer/interface';
import { ColorAttr, IGridAggregation, SizeAttr } from '../../types';
import { HeatmapOptions } from '../heatmap/interface';

/**
 * 数据配置
 */
export interface ISource extends Pick<ISourceCFG, 'parser' | 'transforms'> {
  data: any;
  /**
   * 方格网格聚合
   */
  aggregation: IGridAggregation;
}

/** 网格地图的配置类型定义 */
export interface GridMapOptions extends HeatmapOptions {
  /**
   * 具体的数据
   */
  source: ISource;
  /**
   * 图斑形状
   */
  shape?: heatmapShape2d | heatmapShape3d;
  /**
   * 图斑颜色
   */
  color?: ColorAttr;
  /**
   * 图斑大小
   */
  size?: SizeAttr;
  /**
   * 图层样式
   */
  style?: IGridHeatmapLayerStyleOptions;
}
