import { pointShape2d } from '../../core/layer/interface';
import { PointMapOptions } from '../point-map/interface';

/** 散点图的配置类型定义 */
export interface ScatterMapOptions extends PointMapOptions {
  /**
   * 图形形状
   */
  shape?: pointShape2d;
  /**
   * 图形大小
   */
  size?: number;
}
