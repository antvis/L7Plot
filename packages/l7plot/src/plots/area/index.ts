import { pick } from '@antv/util';
import { Plot } from '../../core/plot';
import { AreaOptions } from './types';
import { DEFAULT_OPTIONS } from './constants';
import { AreaLayer } from '../../layers/area-layer';
import { TextLayer } from '../../layers/text-layer';
import { LegendOptions, Source } from '../../types';
import { LayerGroup } from '../../core/layer/layer-group';

export type { AreaOptions };

export class Area extends Plot<AreaOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 图表类型
   */
  public type = Plot.PlotType.Area;

  /**
   * 填充面图层
   */
  public areaLayer!: AreaLayer;

  /**
   * 标注图层
   */
  public labelLayer: TextLayer | undefined;

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<AreaOptions> {
    return Area.DefaultOptions;
  }

  /**
   * 创建图层
   */
  protected createLayers(source: Source): LayerGroup {
    this.areaLayer = new AreaLayer({
      source,
      ...pick<any>(this.options, AreaLayer.LayerOptionsKeys),
    });
    const layerGroup = new LayerGroup([this.areaLayer]);

    if (this.options.label) {
      this.labelLayer = this.createLabelLayer(source, this.options.label);
      layerGroup.addLayer(this.labelLayer);
    }

    return layerGroup;
  }

  /**
   * 更新图层
   */
  protected updateLayers(options: AreaOptions) {
    const polygonLayerConfig = pick<any>(options, AreaLayer.LayerOptionsKeys);
    this.areaLayer.update(polygonLayerConfig);

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
   * 初始化图层事件
   */
  protected initLayersEvent() {
    //
  }

  /**
   * 实现 legend 配置项
   */
  public getLegendOptions(): LegendOptions {
    const colorLegendItems = this.areaLayer.getColorLegendItems();
    if (colorLegendItems.length !== 0) {
      return { type: 'category', items: colorLegendItems };
    }

    return {};
  }
}
