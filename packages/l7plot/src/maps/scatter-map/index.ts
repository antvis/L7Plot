import { ILayer } from '@antv/l7-core';
import { MapWrapper } from '../../core/map';
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
  public type = MapWrapper.MapType.Scatter;

  /**
   * 散点图层
   */
  get scatterLayer(): ILayer | undefined {
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
  protected getDefaultOptions(): Partial<ScatterMapOptions> {
    return ScatterMap.DefaultOptions;
  }

  /**
   * 获取内置图层名
   */
  protected getInternalLayerName() {
    const pointLayerName = 'scatterLayer';
    return { pointLayerName };
  }
}
