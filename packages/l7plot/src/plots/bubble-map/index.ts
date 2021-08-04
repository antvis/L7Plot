import { Plot } from '../../core/plot';
import { BubbleMapOptions } from './interface';
import { DEFAULT_OPTIONS } from './constants';
import { PointMap } from '../point-map';
import { ILayer } from '../../types';

export class BubbleMap extends PointMap<BubbleMapOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 地图类型
   */
  public type = Plot.MapType.Bubble;

  /**
   * 气泡图层
   */
  get bubbleLayer(): ILayer {
    return this.pointLayerWrapper.layer;
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<BubbleMapOptions> {
    return BubbleMap.DefaultOptions;
  }

  /**
   * 创建图层之前 hook
   */
  protected beforeCreateLayers() {
    const pointLayerConfig = { name: 'bubbleLayer' };

    return { pointLayerConfig };
  }
}
