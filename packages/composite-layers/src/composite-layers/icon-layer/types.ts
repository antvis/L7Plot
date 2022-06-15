import { ISourceCFG, ISource } from '../../types';
import { TextLayerStyleOptions, TextLayerOptions } from '../../core-layers/text-layer/types';
import { PointLayerOptions } from '../../core-layers/point-layer/types';
import { CompositeLayerOptions } from '../../core/composite-layer';
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
};

export interface IconLayerOptions extends CompositeLayerOptions {
  /**
   * 具体的数据
   */
  source: IconLayerSourceOptions | ISource;
  /**
   * 填充兜底颜色，用于颜色值映值不存在时
   */
  fillBottomColor?: false | string;
  /**
   * 填充透明度
   */
  opacity?: number;
  /**
   * 描边色
   */
  icon?: PointLayerOptions['shape'];
  /**
   * 颜色
   */
  color?: PointLayerOptions['color'];
  /**
   * 描边线宽
   */
  radius?: PointLayerOptions['size'];

  iconStyle?: TextLayerStyleOptions;

  /**
   * 文本标注
   */
  label?: Omit<TextLayerOptions, 'source'>;
  /**
   * 交互反馈
   */
  state?: {
    /** 高亮交互 */
    active?: boolean | IconLayerActiveOptions;
    /** 选中交互 */
    select?: boolean | IconLayerActiveOptions;
  };
  /**
   * 是否启用多选
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
  /**
   * 文本标注
   */
}
