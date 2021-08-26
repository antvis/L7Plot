import { Plot } from '../../core/plot';
import { ILayer } from '../../types';
import { PointMap } from '../point-map';
import { DEFAULT_OPTIONS } from './constants';
import { DotDensityMapOptions } from './interface';

export class DotDensityMap extends PointMap<DotDensityMapOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 地图类型
   */
  public type = Plot.MapType.PointCloud;

  /**
   * 点密度图层
   */
  get dotDensityLayer(): ILayer {
    return this.pointLayerWrapper.layer;
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<DotDensityMapOptions> {
    return DotDensityMap.DefaultOptions;
  }

  /**
   * 创建图层之前 hook
   */
  protected beforeCreateLayers() {
    const pointLayerConfig = { name: 'dotDensityLayer' };

    return { pointLayerConfig };
  }
}
