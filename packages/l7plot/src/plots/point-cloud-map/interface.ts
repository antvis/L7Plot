import { PointMapOptions } from '../point-map/interface';

/** 点云图的配置类型定义 */
export interface PointCloudMapOptions extends PointMapOptions {
  /**
   * 图形形状
   */
  shape?: 'dot';
  /**
   * 图形大小
   */
  size?: number;
}
