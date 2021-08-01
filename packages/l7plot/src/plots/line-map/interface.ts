import { AnimateAttr, ColorAttr, IMapOptions, SizeAttr } from '../../types';

export interface LineMapOptions extends IMapOptions {
  /**
   * 图层名
   */
  name?: string;

  /**
   * 线图层是否可见
   */
  visible?: boolean;

  /**
   * 图层绘制顺序
   */
  zIndex?: number;

  /**
   * 初始化完成之后, 是否自动缩放到图层范围
   */
  autoFit?: boolean;

  /**
   * 图层拾取缓存机制
   */
  pickingBuffer?: number;

  /**
   * 图层元素混合效果
   */
  blend?: 'normal' | 'additive' | 'subtractive' | 'max';

  /**
   *
   */
  // scale?:

  /**
   * 是否开启线动画
   */
  animate?: AnimateAttr;

  /**
   * 线类型
   */
  shape?: 'line' | 'arc' | 'arc3d' | 'greatcircle';

  /**
   * 颜色
   */
  color?: ColorAttr;

  /**
   * 线的宽度和高度
   */
  size?: SizeAttr;

  /**
   * 线样式
   */
  style?: {
    lineType?: 'dash' | 'solid';
    opacity?: number;
    stroke?: number;
    offsets?: [number, number];
    strokeWidth?: number;
  };
}
