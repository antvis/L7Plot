import { IGridHeatmapLayerStyleOptions } from '../../core/layer/interface';
import { ColorAttr, SizeAttr } from '../../types';
import { HeatmapOptions } from '../heatmap/interface';

/** 蜂窝地图的配置类型定义 */
export interface HexagonMapOptions extends HeatmapOptions {
  /**
   * 图斑形状
   */
  shape?: 'hexagon' | 'hexagonColumn';
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
