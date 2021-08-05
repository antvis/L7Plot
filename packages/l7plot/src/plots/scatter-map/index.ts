import { Plot } from '../../core/plot';
import { ILayer } from '../../types';
import { PointMap } from '../point-map';
import { DEFAULT_OPTIONS } from './constants';
import { ScatterMapOptions } from './interface';

export class ScatterMap extends PointMap<ScatterMapOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 地图类型
   */
  public type = Plot.MapType.Scatter;

  /**
   * 散点图层
   */
  get scatterLayer(): ILayer {
    return this.pointLayerWrapper.layer;
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<ScatterMapOptions> {
    return ScatterMap.DefaultOptions;
  }

  /**
   * 创建图层之前 hook
   */
  protected beforeCreateLayers() {
    const pointLayerConfig = { name: 'scatterLayer' };

    return { pointLayerConfig };
  }
}
