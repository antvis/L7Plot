import { HeatMapOptions } from './interface';
import { MapWrapper } from '../../core/map';
import { DEFAULT_OPTIONS } from './constants';
import { Heatmap } from '../heatmap';
import { ILayer, ILegendOptions } from '../../types';
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

  /**
   * 实现 legend 配置项
   */
  protected getLegendOptions(): ILegendOptions {
    const sizeLegendItems = this.heatmapLayer.getLegendItems('size');
    console.log('this.heatmapLayer: ', this.heatmapLayer);
    if (sizeLegendItems.length === 0) return {};
    console.log('sizeLegendItems: ', sizeLegendItems);

    const tick = [sizeLegendItems[0].value, sizeLegendItems[sizeLegendItems.length - 1].value];
    console.log('tick: ', tick);
    const colors = this.options.style?.colorsRamp.map(({ color }) => color);
    console.log('colors: ', colors);

    // const items = getColorLegendItems(sizeLegendItems);

    return { items: [] };
  }
}
