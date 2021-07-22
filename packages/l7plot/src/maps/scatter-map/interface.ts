import { ShapeAttr } from '../..';
import { pointShape2d } from '../../core/layer/interface';
import { PointMapOptions } from '../point-map/interface';

/** 散点地图的配置类型定义 */
export interface ScatterMapOptions extends PointMapOptions {
  /**
   * 图斑形状
   */
  shape?: ShapeAttr<pointShape2d>;
  /**
   * 图斑大小
   */
  size?: number;
}
