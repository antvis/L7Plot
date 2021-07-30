import { IPointLayerStyleOptions, pointShape } from '../../core/layer/interface';
import { AnimateAttr, ColorAttr, IMapOptions, SizeAttr } from '../../types';
import { ShapeAttr } from '../../types';

/** 点地图的配置类型定义 */
export interface PointMapOptions extends IMapOptions {
  /**
   * 图斑形状
   */
  shape?: ShapeAttr<pointShape | string>;
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
  style?: IPointLayerStyleOptions;
  /**
   * animation 配置
   */
  animate?: AnimateAttr;
}
