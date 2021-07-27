import { HeatMapOptions } from './interface';
import { MapWrapper } from '../../core/map';
import { DEFAULT_OPTIONS } from './constants';
import { Heatmap } from '../heatmap';
import { ILayer } from '../../types';
export class HeatMap extends Heatmap<HeatMapOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 地图类型
   */
  public type = MapWrapper.MapType.HeatMap;

  /**
   * 热力图层
   */
  get heatmapLayer(): ILayer {
    return this.heatmapLayerWrapper.layer;
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<HeatMapOptions> {
    return HeatMap.DefaultOptions;
  }

  /**
   * 创建图层之前 hook
   */
  protected beforeCreateLayers() {
    const heatmapLayerConfig = { name: 'heatmapLayer' };

    return { heatmapLayerConfig };
  }
}
