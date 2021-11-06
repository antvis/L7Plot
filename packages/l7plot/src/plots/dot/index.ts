import { pick } from '@antv/util';
import { Plot } from '../../core/plot';
import { DotOptions } from './types';
import { DEFAULT_OPTIONS } from './constants';
import { DotLayer } from '../../layers/dot-layer';
import { TextLayer } from '../../layers/text-layer';
import { LegendOptions, Source } from '../../types';
import { LayerGroup } from '../../core/layer/layer-group';

export type { DotOptions };

export class Dot extends Plot<DotOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 图表类型
   */
  public type = Plot.PlotType.Dot;

  /**
   * 点图层
   */
  public dotLayer!: DotLayer;

  /**
   * 标注图层
   */
  public labelLayer: TextLayer | undefined;

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<DotOptions> {
    return Dot.DefaultOptions;
  }

  /**
   * 创建图层
   */
  protected createLayers(source: Source): LayerGroup {
    this.dotLayer = new DotLayer({
      source,
      ...pick<any>(this.options, DotLayer.LayerOptionsKeys),
    });
    const layerGroup = new LayerGroup([this.dotLayer]);

    if (this.options.label) {
      this.labelLayer = this.createLabelLayer(source, this.options.label);
      layerGroup.addlayer(this.labelLayer);
    }

    return layerGroup;
  }

  /**
   * 更新图层
   */
  protected updateLayers(options: DotOptions) {
    const dotLayerConfig = pick<any>(options, DotLayer.LayerOptionsKeys);
    this.dotLayer.update(dotLayerConfig);

    if (options.label) {
      if (this.labelLayer) {
        this.labelLayer.update({ ...options.label });
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
  public getLegendOptions(): LegendOptions {
    const colorLegendItems = this.dotLayer.getColorLegendItems();
    if (colorLegendItems.length !== 0) {
      return { type: 'category', items: colorLegendItems };
    }

    return {};
  }
}
