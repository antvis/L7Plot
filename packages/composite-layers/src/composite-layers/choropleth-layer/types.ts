import { IParserCfg } from '@antv/l7';
import { PolygonLayerOptions } from '../../core-layers/polygon-layer/types';
import { CompositeLayerOptions } from '../../core/composite-layer';
import { ISourceCFG, ISource } from '../../types';
import { LabelOptions } from '../common/types';

/**
 * 数据配置
 */
export interface ChoroplethLayerSourceOptions extends Pick<ISourceCFG, 'parser' | 'transforms'> {
  /** 数据 */
  data: any;
}

export type ChoroplethLayerActiveOptions = {
  /** 填充颜色 */
  fillColor?: false | string;
  /** 描边颜色 */
  strokeColor?: false | string;
  /** 描边的宽度 */
  lineWidth?: number;
  /** 描边透明度 */
  lineOpacity?: number;
};

/**
 * 文本标注点位，默认不需要设置，点位为几何中心点。
 */
export type LabelPosition = Pick<IParserCfg, 'x' | 'y' | 'coordinates' | 'geometry'> | false;

export interface ChoroplethLayerOptions extends CompositeLayerOptions {
  /**
   * 数据配置
   */
  source: ChoroplethLayerSourceOptions | ISource;
  /**
   * 填充色
   * @default '#5FD3A6'
   */
  fillColor?: PolygonLayerOptions['color'];

  /**
   * 填充透明度
   * @default 1
   */
  opacity?: number;
  /**
   * 描边色
   */
  strokeColor?: PolygonLayerOptions['color'];
  /**
   * 描边线宽
   * @default 1
   */
  lineWidth?: PolygonLayerOptions['size'];
  /**
   * 描边透明度
   * @default 1
   */
  lineOpacity?: number;
  /**
   * 描边的类型
   * @default 'solid'
   */
  lineType?: 'solid' | 'dash';
  /**
   * 描边的虚线配置
   * 第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为 [0,0] 的效果为没有描边。
   */
  lineDash?: [number, number];
  /**
   * 文本标注
   */
  label?: LabelOptions & {
    /**
     * 文本标注点位，默认不需要设置，点位为几何中心点。
     * 指定经纬度字段时: { x: string, y: string };
     * 指定数组坐标字段时: { coordinates: string };
     * 指定 geometry 字段时: { geometry: string };
     * @default false
     */
    position?: LabelPosition;
  };
  /**
   * 交互反馈
   */
  state?: {
    /**
     * 高亮交互
     * @default false
     */
    active?: boolean | ChoroplethLayerActiveOptions;
    /**
     * 选中交互
     * @default false
     */
    select?: boolean | ChoroplethLayerActiveOptions;
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
