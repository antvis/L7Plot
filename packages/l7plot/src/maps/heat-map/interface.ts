import { IHeatmapLayerStyleOptions, IGridHeatmapLayerStyleOptions, heatmapShape } from '../../core/layer/interface';
import { ColorAttr, IMapOptions, SizeAttr } from '../../types';
import { ShapeAttr } from '../../types';

/** 点地图的配置类型定义 */
export interface HeatMapOptions extends IMapOptions {
  /**
   * 图斑形状
   */
  shape?: ShapeAttr<heatmapShape>;
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
  style?: IHeatmapLayerStyleOptions | IGridHeatmapLayerStyleOptions;
}
