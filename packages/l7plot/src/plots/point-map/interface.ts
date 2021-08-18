import { IPointLayerStyleOptions, pointShape } from '../../core/layer/interface';
import { animateAttr, ColorAttr, IPlotOptions, SizeAttr } from '../../types';
import { ShapeAttr } from '../../types';

/** 点地图的配置类型定义 */
export interface PointMapOptions extends IPlotOptions {
  /**
   * 图形形状
   */
  shape?: ShapeAttr<pointShape | string>;
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
  style?: IPointLayerStyleOptions;
  /**
   * animation 配置
   */
  animate?: animateAttr;
}
