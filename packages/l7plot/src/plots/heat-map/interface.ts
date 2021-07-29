import { IHeatmapLayerStyleOptions, IGridHeatmapLayerStyleOptions } from '../../core/layer/interface';
import { SizeAttr } from '../../types';
import { HeatmapOptions } from '../heatmap/interface';

/** 热力地图的配置类型定义 */
export interface HeatMapOptions extends Omit<HeatmapOptions, 'color'> {
  /**
   * 图斑形状
   */
  shape?: 'heatmap' | 'heatmap3D';
  /**
   * 图斑大小
   */
  size?: SizeAttr;
  /**
   * 图层样式
   */
  style?: Omit<IHeatmapLayerStyleOptions, 'rampColors'> | IGridHeatmapLayerStyleOptions;
}
