import { IHeatmapLayerStyleOptions, IGridHeatmapLayerStyleOptions, heatmapShape } from '../../core/layer/interface';
import { ColorAttr, IMapOptions, SizeAttr } from '../../types';

/** 热地图的配置类型定义 */
export interface HeatmapOptions extends IMapOptions {
  /**
   * 图斑形状
   */
  shape?: heatmapShape;
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
  style?: Omit<IHeatmapLayerStyleOptions, 'rampColors'> | IGridHeatmapLayerStyleOptions;
}
