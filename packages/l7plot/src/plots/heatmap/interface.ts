import { IHeatmapLayerStyleOptions } from '../../core/layer/interface';
import { SizeAttr } from '../../types';
import { HeatOptions } from '../heat/interface';

/** 热力图的配置类型定义 */
export interface HeatmapOptions extends Omit<HeatOptions, 'color'> {
  /**
   * 图形形状
   */
  shape?: 'heatmap' | 'heatmap3D';
  /**
   * 图形大小
   */
  size?: SizeAttr;
  /**
   * 图层样式
   */
  style?: Omit<IHeatmapLayerStyleOptions, 'rampColors'>;
}
