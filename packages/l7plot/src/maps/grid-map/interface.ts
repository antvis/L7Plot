import { IGridHeatmapLayerStyleOptions, heatmapShape2d, heatmapShape3d } from '../../core/layer/interface';
import { ColorAttr, SizeAttr } from '../../types';
import { HeatmapOptions } from '../heatmap/interface';

/** 网格地图的配置类型定义 */
export interface GridMapOptions extends HeatmapOptions {
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
