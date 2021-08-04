import { IMapOptions } from './map';
import { IStateAttribute } from './attr';

/**
 * 基础 plot options 配置
 */
export interface IPlotOptions extends IMapOptions {
  /**
   * 是否自动缩放到图层范围，默认为 false
   */
  readonly autoFit?: boolean;

  /**
   * 交互反馈
   */
  readonly state?: IStateAttribute;
}

export interface IL7PlotOptions extends IMapOptions {
  // TODO:
  plots: any[];
}
