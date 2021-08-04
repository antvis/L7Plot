import { Map } from '../map';
import { MapType, IPlotOptions } from '../../types';

const DEFAULT_OPTIONS: Partial<IPlotOptions> = {
  autoFit: false,
};

export abstract class Plot<O extends IPlotOptions> extends Map<O> {
  /**
   * 默认的 options 配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;
  /**
   * 地图图表类型
   */
  static MapType = MapType;
  /**
   * map 类型名称
   */
  public abstract readonly type: MapType | string;

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<IPlotOptions> {
    return Plot.DefaultOptions;
  }
}
