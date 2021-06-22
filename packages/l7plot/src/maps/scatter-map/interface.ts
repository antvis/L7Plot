import { PointMapOptions } from '../point-map/interface';

/** 散点图的配置类型定义 */
export interface ScatterMapOptions extends PointMapOptions {
  /**
   * 图斑大小
   */
  size?: number;
}
