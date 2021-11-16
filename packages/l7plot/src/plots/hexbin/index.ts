import { pick } from '@antv/util';
import { Plot } from '../../core/plot';
import { HexbinOptions } from './types';
import { DEFAULT_OPTIONS } from './constants';
import { Source } from '../../types';
import { TextLayer } from '../../layers/text-layer';
import { HexbinLayer } from '../../layers/hexbin-layer';
import { LayerGroup } from '../../core/layer/layer-group';

export type { HexbinOptions };

export class Hexbin extends Plot<HexbinOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 地图类型
   */
  public type = Plot.PlotType.Hexagon;

  /**
   * 蜂窝图层
   */
  public hexbinLayer!: HexbinLayer;

  /**
   * 标注图层
   */
  public labelLayer: TextLayer | undefined;

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<HexbinOptions> {
    return Hexbin.DefaultOptions;
  }

  /**
   * 创建图层
   */
  protected createLayers(source: Source): LayerGroup {
    this.hexbinLayer = new HexbinLayer({
      source,
      ...pick<any>(this.options, HexbinLayer.LayerOptionsKeys),
    });
    const layerGroup = new LayerGroup([this.hexbinLayer]);

    if (this.options.label) {
      this.labelLayer = this.createLabelLayer(this.source, this.options.label);
      layerGroup.addLayer(this.labelLayer);
    }

    return layerGroup;
  }

  /**
   * 更新图层
   */
  protected updateLayers(options: HexbinOptions) {
    const heatMapLayerConfig = pick<any>(options, HexbinLayer.LayerOptionsKeys);
    this.hexbinLayer.update(heatMapLayerConfig);

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
}
