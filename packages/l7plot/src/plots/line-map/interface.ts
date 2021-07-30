import { AnimateAttr, ColorAttr, IMapOptions } from '../../types';

export interface LineMapOptions extends IMapOptions {
  /**
   * 是否开启线动画
   */
  animate?: AnimateAttr;

  /**
   * 线类型
   */
  shape?: string;

  /**
   * 颜色
   */
  color?: ColorAttr;
}
