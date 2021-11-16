import { pick } from '@antv/util';
import { Plot } from '../../core/plot';
import { HeatmapOptions } from './types';
import { DEFAULT_OPTIONS } from './constants';
import { LegendOptions, Source } from '../../types';
import { TextLayer } from '../../layers/text-layer';
import { HeatmapLayer } from '../../layers/heatmap-layer';
import { LayerGroup } from '../../core/layer/layer-group';

export type { HeatmapOptions };

export class Heatmap extends Plot<HeatmapOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 地图类型
   */
  public type = Plot.PlotType.Heatmap;

  /**
   * 热力图层
   */
  public heatmapLayer!: HeatmapLayer;

  /**
   * 标注图层
   */
  public labelLayer: TextLayer | undefined;

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<HeatmapOptions> {
    return Heatmap.DefaultOptions;
  }

  /**
   * 创建图层
   */
  protected createLayers(source: Source): LayerGroup {
    this.heatmapLayer = new HeatmapLayer({
      source,
      ...pick<any>(this.options, HeatmapLayer.LayerOptionsKeys),
    });
    const layerGroup = new LayerGroup([this.heatmapLayer]);

    if (this.options.label) {
      this.labelLayer = this.createLabelLayer(this.source, this.options.label);
      layerGroup.addLayer(this.labelLayer);
    }

    return layerGroup;
  }

  /**
   * 更新图层
   */
  protected updateLayers(options: HeatmapOptions) {
    const heatMapLayerConfig = pick<any>(options, HeatmapLayer.LayerOptionsKeys);
    this.heatmapLayer.update(heatMapLayerConfig);

    if (options.label) {
      if (this.labelLayer) {
        this.labelLayer.update({ ...options.label });
      } else {
        this.labelLayer = this.createLabelLayer(this.source, options.label);
        this.layerGroup.addLayer(this.labelLayer);
      }
    } else {
      if (this.labelLayer) {
        this.layerGroup.removeLayer(this.labelLayer);
      }
    }
  }

  /**
   * 实现 legend 配置项
   */
  public getLegendOptions(): LegendOptions {
    const sizeLegendItems = this.heatmapLayer.layer.getLegendItems('size');
    if (Array.isArray(sizeLegendItems) && sizeLegendItems.length !== 0) {
      const min = sizeLegendItems[0].value;
      const max = sizeLegendItems[sizeLegendItems.length - 1].value;
      const colors = this.heatmapLayer.options.style?.colorsRamp.map(({ color }) => color);

      return { type: 'continue', min, max, colors };
    }

    return {};
  }
}
