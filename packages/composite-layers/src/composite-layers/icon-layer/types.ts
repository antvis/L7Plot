import { ISourceCFG, ISource } from '../../types';
import { PointLayerStyleOptions } from '../../core-layers/point-layer/types';
import { PointLayerOptions } from '../../core-layers/point-layer/types';
import { TextLayerStyleOptions } from '../../core-layers/text-layer/types';
import { CompositeLayerOptions } from '../../core/composite-layer';
import { LabelOptions } from '../common/types';

/**
 * 数据配置
 */
export interface IconLayerSourceOptions extends Pick<ISourceCFG, 'parser' | 'transforms'> {
  /** 图标数据 */
  data: any;
}

export type IconLayerActiveOptions = {
  enable?: boolean;
  /**图标大小 */
  radius?: number;
  /**图标颜色 */
  color?: string;
  /**图标透明度 */
  opacity?: number;
  /**高亮图标名 */
  icon?: PointLayerOptions['shape'];
};

export interface IconLayerOptions extends CompositeLayerOptions {
  /**
   * 数据配置
   */
  source: IconLayerSourceOptions | ISource;

  /**
   * 填充透明度
   * @default 1
   */
  opacity?: number;
  /**
   * 图标名
   */
  icon?: PointLayerOptions['shape'];

  /**
   * 图标颜色
   * @default null
   */
  fillColor?: PointLayerOptions['color'];

  /**
   * 图标大小
   * @default 12
   */
  radius?: PointLayerOptions['size'];
  /**
   * 图标样式
   */
  iconStyle?: PointLayerStyleOptions;
  /**
   * 文本标注
   */
  label?: LabelOptions;
  /**
   * 交互反馈
   */
  state?: {
    /**
     * 高亮交互
     * @default false
     */
    active?:
      | boolean
      | {
          color: string;
          enable?: boolean;
        };
    /**
     * 选中交互
     * @default false
     */
    select?: boolean | IconLayerActiveOptions;
  };
  /**
   * 是否启用多选，开启后默认按 "Shift" 快捷键使用
   * @default false
   */
  enabledMultiSelect?: boolean;
  /**
   * 触发多选的快捷键
   * @default "Shift"
   */
  triggerMultiSelectKey?: KeyboardEvent['key'];
}

export interface IconImageLayerOptions extends IconLayerOptions {
  /**
   * 图标资源
   */
  iconAtlas: {
    [key: string]: string;
  };
  /**
   * 图标样式
   */
  iconStyle?: PointLayerStyleOptions;

  /**
   * 颜色
   */
  fillColor?: PointLayerOptions['color'];
}

export interface IconFontLayerOptions extends IconLayerOptions {
  /**
   * 图标资源
   */
  iconAtlas: {
    /**
     * 字体文件路径 JS
     */
    fontPath: string;
    /**
     * 字体类型
     */
    fontFamily: string;
    /**
     * 文字名称与字体code映射
     */
    iconFonts: Array<[string, string]>;
  };
  /**
   * 图标样式
   */
  iconStyle?: TextLayerStyleOptions;
}
