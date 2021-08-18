import { IGridHeatmapLayerStyleOptions } from '../../core/layer/interface';
import { ISourceCFG, ColorAttr, IGridAggregation, SizeAttr } from '../../types';
import { HeatOptions } from '../heat/interface';

/**
 * 数据配置
 */
export interface ISource extends Pick<ISourceCFG, 'parser' | 'transforms'> {
  data: any;
  /**
   * 六边形网格聚合
   */
  aggregation: IGridAggregation;
}

/** 蜂窝图的配置类型定义 */
export interface HexagonMapOptions extends HeatOptions {
  /**
   * 具体的数据
   */
  source: ISource;
  /**
   * 图形形状
   */
  shape?: 'hexagon' | 'hexagonColumn';
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
