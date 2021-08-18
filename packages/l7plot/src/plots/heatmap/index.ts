import { HeatmapOptions } from './interface';
import { Plot } from '../../core/plot';
import { DEFAULT_OPTIONS } from './constants';
import { Heat } from '../heat';
import { ILayer, ILegendOptions } from '../../types';
export class Heatmap extends Heat<HeatmapOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 地图类型
   */
  public type = Plot.MapType.Heatmap;

  /**
   * 热力图层
   */
  get heatmapLayer(): ILayer {
    return this.heatmapLayerWrapper.layer;
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<HeatmapOptions> {
    return Heatmap.DefaultOptions;
  }

  /**
   * 创建图层之前 hook
   */
  protected beforeCreateLayers() {
    const heatmapLayerConfig = { name: 'heatmapLayer' };

    return { heatmapLayerConfig };
  }

  /**
   * 实现 legend 配置项
   */
  public getLegendOptions(): ILegendOptions {
    const sizeLegendItems = this.heatmapLayer.getLegendItems('size');
    if (Array.isArray(sizeLegendItems) && sizeLegendItems.length !== 0) {
      const min = sizeLegendItems[0].value;
      const max = sizeLegendItems[sizeLegendItems.length - 1].value;
      const colors = this.options.style?.colorsRamp.map(({ color }) => color);

      return { type: 'continue', min, max, colors };
    }

    return {};
  }
}
