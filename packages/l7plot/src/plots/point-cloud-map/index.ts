import { MapWrapper } from '../../core/map';
import { ILayer } from '../../types';
import { PointMap } from '../point-map';
import { DEFAULT_OPTIONS } from './constants';
import { PointCloudMapOptions } from './interface';

export class PointCloudMap extends PointMap<PointCloudMapOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 地图类型
   */
  public type = MapWrapper.MapType.PointCloud;

  /**
   * 点云图层
   */
  get pointCloudLayer(): ILayer {
    return this.pointLayerWrapper.layer;
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<PointCloudMapOptions> {
    return PointCloudMap.DefaultOptions;
  }

  /**
   * 创建图层之前 hook
   */
  protected beforeCreateLayers() {
    const pointLayerConfig = { name: 'pointCloudLayer' };

    return { pointLayerConfig };
  }
}
