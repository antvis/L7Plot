import { pick } from '@antv/util';
import { Source } from '../../types';
import { Plot } from '../../core/plot';
import { DEFAULT_OPTIONS } from './constants';
import { DotDensityOptions } from './interface';
import { LayerGroup } from '../../core/layer/layer-group';
import { DotDensityLayer } from '../../layers/dot-density-layer';

export class DotDensity extends Plot<DotDensityOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 地图类型
   */
  public type = Plot.MapType.DotDensity;

  /**
   * 点密度图层
   */
  public dotDensityLayer!: DotDensityLayer;

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<DotDensityOptions> {
    return DotDensity.DefaultOptions;
  }

  /**
   * 创建图层
   */
  protected createLayers(source: Source): LayerGroup {
    this.dotDensityLayer = new DotDensityLayer({
      source,
      ...pick<any>(this.options, DotDensityLayer.LayerOptionsKeys),
    });
    const layerGroup = new LayerGroup([this.dotDensityLayer]);

    return layerGroup;
  }

  /**
   * 更新图层
   */
  protected updateLayers(options: DotDensityOptions) {
    const bubbleLayerConfig = pick<any>(options, DotDensityLayer.LayerOptionsKeys);
    this.dotDensityLayer.updateOptions(bubbleLayerConfig);
  }
}
