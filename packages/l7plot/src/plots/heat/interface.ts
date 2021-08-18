import { IHeatmapLayerStyleOptions, IGridHeatmapLayerStyleOptions, heatmapShape } from '../../core/layer/interface';
import { ColorAttr, IPlotOptions, SizeAttr, ISourceCFG } from '../../types';

/**
 * 数据配置
 */
export interface ISource extends Pick<ISourceCFG, 'parser' | 'transforms'> {
  data: any;
}

/** 热力图的配置类型定义 */
export interface HeatOptions extends IPlotOptions {
  /**
   * 具体的数据
   */
  source: ISource;
  /**
   * 图形形状
   */
  shape?: heatmapShape;
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
  style?: Omit<IHeatmapLayerStyleOptions, 'rampColors'> | IGridHeatmapLayerStyleOptions;
}
