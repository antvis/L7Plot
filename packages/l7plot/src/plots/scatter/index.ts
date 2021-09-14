import { pick } from '@antv/util';
import { Plot } from '../../core/plot';
import { DEFAULT_OPTIONS } from './constants';
import { ScatterOptions } from './interface';
import { ScatterLayer } from '../../layers/scatter-layer';
import { LabelLayer } from '../../layers/label-layer';
import { ILegendOptions, Source } from '../../types';
import { LayerGroup } from '../../core/layer/layer-group';

export class Scatter extends Plot<ScatterOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 地图类型
   */
  public type = Plot.MapType.Scatter;

  /**
   * 散点图层
   */
  public scatterLayer!: ScatterLayer;

  /**
   * 标注图层
   */
  public labelLayer: LabelLayer | undefined;

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<ScatterOptions> {
    return Scatter.DefaultOptions;
  }

  /**
   * 创建图层
   */
  protected createLayers(source: Source): LayerGroup {
    this.scatterLayer = new ScatterLayer({
      source,
      ...pick<any>(this.options, ScatterLayer.LayerOptionsKeys),
    });
    const layerGroup = new LayerGroup([this.scatterLayer]);

    if (this.options.label) {
      this.labelLayer = this.createLabelLayer(source, this.options.label);
      layerGroup.addlayer(this.labelLayer);
    }

    return layerGroup;
  }

  /**
   * 更新图层
   */
  protected updateLayers(options: ScatterOptions) {
    const scatterLayerConfig = pick<any>(options, ScatterLayer.LayerOptionsKeys);
    this.scatterLayer.updateOptions(scatterLayerConfig);

    if (options.label) {
      if (this.labelLayer) {
        this.labelLayer.updateOptions({ ...options.label });
      } else {
        this.labelLayer = this.createLabelLayer(this.source, options.label);
        this.layerGroup.addlayer(this.labelLayer);
      }
    } else {
      if (this.labelLayer) {
        this.layerGroup.removelayer(this.labelLayer);
      }
    }
  }

  /**
   * 实现 legend 配置项
   */
  public getLegendOptions(): ILegendOptions {
    const colorLegendItems = this.scatterLayer.getColorLegendItems();
    if (colorLegendItems.length !== 0) {
      return { type: 'category', items: colorLegendItems };
    }

    return {};
  }
}
