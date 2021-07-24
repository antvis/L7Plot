import { ILayer } from '@antv/l7-core';
import { MapWrapper } from '../../core/map';
import { PointMap } from '../point-map';
import { DEFAULT_OPTIONS } from './constants';
import { IconMapOptions } from './interface';
export class IconMap extends PointMap<IconMapOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 地图类型
   */
  public type = MapWrapper.MapType.Icon;

  /**
   * 图标图层
   */
  get iconLayer(): ILayer {
    return this.pointLayerWrapper.layer;
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
  protected getDefaultOptions(): Partial<IconMapOptions> {
    return IconMap.DefaultOptions;
  }

  /**
   * 获取内置图层名
   */
  protected getInternalLayerName() {
    return { pointLayerName: 'iconLayer', labeLayerName: 'labelLayer' };
  }
}
