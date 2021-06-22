import { IPointLayerStyleOptions } from '../../core/layer/interface';
import { animateAttr, ColorAttr, IMapOptions, SizeAttr } from '../../types';
import { ShapeAttr } from '../../types';

type pointShape2d =
  | 'circle'
  | 'square'
  | 'hexagon'
  | 'triangle'
  | 'pentagon'
  | 'octogon'
  | 'hexagram'
  | 'rhombus'
  | 'vesica'
  | 'dot';

type pointShape3d = 'cylinder' | 'triangleColumn' | 'hexagonColumn' | 'squareColumn';

export type pointShape = pointShape2d | pointShape3d;

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
  animate?: animateAttr;
}
