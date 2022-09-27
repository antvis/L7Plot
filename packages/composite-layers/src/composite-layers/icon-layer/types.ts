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

  icon?: PointLayerOptions['shape'];
};

export interface IconLayerOptions extends CompositeLayerOptions {
  /**
   * 数据配置
   */
  source: IconLayerSourceOptions | ISource;
  /**
   * 填充兜底颜色，用于颜色值映值不存在时
   */
  fillBottomColor?: false | string;
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
   * 颜色
   */
  color?: PointLayerOptions['color'];
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
  // 文档暂时不透出，后面改多选和单选并存交互
  // https://github.com/antvis/L7Plot/issues/176
  /**
   * 是否启用多选
   * @default false
   */
  enabledMultiSelect?: boolean;
}

export interface IconImageLayerOptions extends IconLayerOptions {
  /**
   * 图标资源
   */
  iconAtlas: {
    [key: string]: string;
  };
  iconStyle?: PointLayerStyleOptions;
}

export interface IconFontLayerOptions extends IconLayerOptions {
  /**
   * 图标资源
   */
  iconAtlas: {
    fontPath: string;
    fontFamily: string;
    iconFonts: Array<[string, string]>;
  };
  iconStyle?: TextLayerStyleOptions;

  /**
   * 文本标注
   */
}
