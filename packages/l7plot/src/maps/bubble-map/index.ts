import { ILayer } from '@antv/l7-core';
import { MapWrapper } from '../../core/map';
import { BubbleMapOptions } from './interface';
import { DEFAULT_OPTIONS } from './constants';
import { PointMap } from '../point-map';

export class BubbleMap extends PointMap<BubbleMapOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 地图类型
   */
  public type = MapWrapper.MapType.Bubble;

  /**
   * 气泡图层
   */
  get bobbleLayer(): ILayer | undefined {
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
  protected getDefaultOptions(): Partial<BubbleMapOptions> {
    return BubbleMap.DefaultOptions;
  }
}
