import { IGridHeatmapLayerStyleOptions, heatmapShape2d, heatmapShape3d } from '../../core/layer/interface';
import { ColorAttr, IGridAggregation, ISourceCFG, SizeAttr } from '../../types';
import { HeatOptions } from '../heat/interface';

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

/** 网格图的配置类型定义 */
export interface GridMapOptions extends HeatOptions {
  /**
   * 具体的数据
   */
  source: ISource;
  /**
   * 图形形状
   */
  shape?: heatmapShape2d | heatmapShape3d;
  /**
   * 图形颜色
   */
  color?: ColorAttr;
  /**
   * 图形大小
   */
  size?: SizeAttr;
  /**
   * 图层样式
   */
  style?: IGridHeatmapLayerStyleOptions;
}
