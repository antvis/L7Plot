import { PointMapOptions } from '../point-map/interface';

/** 点云地图的配置类型定义 */
export interface PointCloudMapOptions extends PointMapOptions {
  /**
   * 图斑形状
   */
  shape?: 'dot';
  /**
   * 图斑大小
   */
  size?: number;
}
