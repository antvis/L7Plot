import { pick } from '@antv/util';
import { Plot } from '../../core/plot';
import { PathOptions } from './types';
import { DEFAULT_OPTIONS } from './constants';
import { PathLayer } from '../../layers/path-layer';
import { LegendOptions, Source } from '../../types';
import { LayerGroup } from '../../core/layer/layer-group';

export type { PathOptions };

export class Path extends Plot<PathOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 图表类型
   */
  public type = Plot.PlotType.Path;

  /**
   * 路径图层
   */
  public pathLayer!: PathLayer;

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<PathOptions> {
    return Path.DefaultOptions;
  }

  /**
   * 创建图层
   */
  protected createLayers(source: Source): LayerGroup {
    this.pathLayer = new PathLayer({
      source,
      ...pick<any>(this.options, PathLayer.LayerOptionsKeys),
    });
    const layerGroup = new LayerGroup([this.pathLayer]);

    return layerGroup;
  }

  /**
   * 更新图层
   */
  protected updateLayers(options: PathOptions) {
    const dotLayerConfig = pick<any>(options, PathLayer.LayerOptionsKeys);
    this.pathLayer.update(dotLayerConfig);
  }

  /**
   * 实现 legend 配置项
   */
  public getLegendOptions(): LegendOptions {
    const colorLegendItems = this.pathLayer.getColorLegendItems();
    if (colorLegendItems.length !== 0) {
      return { type: 'category', items: colorLegendItems };
    }

    return {};
  }
}
