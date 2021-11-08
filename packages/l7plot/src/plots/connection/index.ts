import { pick } from '@antv/util';
import { Plot } from '../../core/plot';
import { ConnectionOptions } from './types';
import { DEFAULT_OPTIONS } from './constants';
import { ConnectionLayer } from '../../layers/connection-layer';
import { LegendOptions, Source } from '../../types';
import { LayerGroup } from '../../core/layer/layer-group';

export type { ConnectionOptions };

export class Connection extends Plot<ConnectionOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 图表类型
   */
  public type = Plot.PlotType.Connection;

  /**
   * 连接图层
   */
  public connectionLayer!: ConnectionLayer;

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<ConnectionOptions> {
    return Connection.DefaultOptions;
  }

  /**
   * 创建图层
   */
  protected createLayers(source: Source): LayerGroup {
    this.connectionLayer = new ConnectionLayer({
      source,
      ...pick<any>(this.options, ConnectionLayer.LayerOptionsKeys),
    });
    const layerGroup = new LayerGroup([this.connectionLayer]);

    return layerGroup;
  }

  /**
   * 更新图层
   */
  protected updateLayers(options: ConnectionOptions) {
    const dotLayerConfig = pick<any>(options, ConnectionLayer.LayerOptionsKeys);
    this.connectionLayer.update(dotLayerConfig);
  }

  /**
   * 实现 legend 配置项
   */
  public getLegendOptions(): LegendOptions {
    const colorLegendItems = this.connectionLayer.getColorLegendItems();
    if (colorLegendItems.length !== 0) {
      return { type: 'category', items: colorLegendItems };
    }

    return {};
  }
}
