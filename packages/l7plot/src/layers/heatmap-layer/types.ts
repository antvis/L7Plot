import { HeatmapLayerConfig, HeatmapLayerStyleOptions } from '../../types/layer';
import { ISourceCFG, Source } from '../../types';

/**
 * 数据配置
 */
export interface HeatmapLayerSourceOptions extends Pick<ISourceCFG, 'parser' | 'transforms'> {
  data: any;
}

export interface HeatmapLayerOptions extends Omit<HeatmapLayerConfig, 'color'> {
  /**
   * 具体的数据
   */
  source: HeatmapLayerSourceOptions | Source;
  /**
   * 图形形状
   */
  shape?: 'heatmap' | 'heatmap3D';
  /**
   * 图层样式
   */
  style?: HeatmapLayerStyleOptions;
}
