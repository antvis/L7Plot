import { pick } from '@antv/util';
import { Plot } from '../../core/plot';
import { FlowOptions } from './types';
import { DEFAULT_OPTIONS } from './constants';
import { FlowLayer } from '../../layers/flow-layer';
import { LegendOptions, Source } from '../../types';
import { LayerGroup } from '../../core/layer/layer-group';

export type { FlowOptions };

export class Flow extends Plot<FlowOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 图表类型
   */
  public type = Plot.PlotType.Flow;

  /**
   * 流向图层
   */
  public flowLayer!: FlowLayer;

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<FlowOptions> {
    return Flow.DefaultOptions;
  }

  /**
   * 创建图层
   */
  protected createLayers(source: Source): LayerGroup {
    this.flowLayer = new FlowLayer({
      source,
      ...pick<any>(this.options, FlowLayer.LayerOptionsKeys),
    });
    const layerGroup = new LayerGroup([this.flowLayer]);

    return layerGroup;
  }

  /**
   * 更新图层
   */
  protected updateLayers(options: FlowOptions) {
    const dotLayerConfig = pick<any>(options, FlowLayer.LayerOptionsKeys);
    this.flowLayer.update(dotLayerConfig);
  }

  /**
   * 实现 legend 配置项
   */
  public getLegendOptions(): LegendOptions {
    const colorLegendItems = this.flowLayer.getColorLegendItems();
    if (colorLegendItems.length !== 0) {
      return { type: 'category', items: colorLegendItems };
    }

    return {};
  }
}
