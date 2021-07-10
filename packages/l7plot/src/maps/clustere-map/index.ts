import { ILayer } from '@antv/l7-core';
import { MapWrapper } from '../../core/map';
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
   * 标注图层
   */
  get labelLayer(): ILayer | undefined {
    return this.labelLayerWrapper?.layer;
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<ClustereMapOptions> {
    return ClustereMap.DefaultOptions;
  }

  /**
   * 获取内置图层名
   */
  protected getInternalLayerName() {
    const pointLayerName = 'clusterLayer';
    return { pointLayerName };
  }
}
