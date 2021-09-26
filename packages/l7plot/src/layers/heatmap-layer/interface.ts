import { IHeatmapLayerConfig, IHeatmapLayerStyleOptions } from '../../types/layer';
import { ISourceCFG, Source } from '../../types';

/**
 * 数据配置
 */
export interface ISource extends Pick<ISourceCFG, 'parser' | 'transforms'> {
  data: any;
}

export interface IHeatmapLayerOptions extends Omit<IHeatmapLayerConfig, 'color'> {
  /**
   * 具体的数据
   */
  source: ISource | Source;
  /**
   * 图形形状
   */
  shape?: 'heatmap' | 'heatmap3D';
  /**
   * 图层样式
   */
  style?: IHeatmapLayerStyleOptions;
}
