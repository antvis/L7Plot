import { MapWrapper } from '../../core/map';
import { ILayer } from '../../types';
import { PointMap } from '../point-map';
import { DEFAULT_OPTIONS } from './constants';
import { ClustereMapOptions } from './interface';

export class ClustereMap extends PointMap<ClustereMapOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 地图类型
   */
  public type = MapWrapper.MapType.Clustere;

  /**
   * 聚合图层
   */
  get clusterLayer(): ILayer | undefined {
    return this.pointLayerWrapper?.layer;
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<ClustereMapOptions> {
    return ClustereMap.DefaultOptions;
  }

  /**
   * 创建图层之前 hook
   */
  protected beforeCreateLayers() {
    const pointLayerConfig = { name: 'clusterLayer' };

    return { pointLayerConfig };
  }
}
