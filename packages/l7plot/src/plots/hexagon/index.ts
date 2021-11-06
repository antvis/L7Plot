import { pick } from '@antv/util';
import { Plot } from '../../core/plot';
import { HexagonOptions } from './types';
import { DEFAULT_OPTIONS } from './constants';
import { Source } from '../../types';
import { TextLayer } from '../../layers/text-layer';
import { HexagonLayer } from '../../layers/hexagon-layer';
import { LayerGroup } from '../../core/layer/layer-group';

export type { HexagonOptions };

export class Hexagon extends Plot<HexagonOptions> {
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
  public hexagonLayer!: HexagonLayer;

  /**
   * 标注图层
   */
  public labelLayer: TextLayer | undefined;

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<HexagonOptions> {
    return Hexagon.DefaultOptions;
  }

  /**
   * 创建图层
   */
  protected createLayers(source: Source): LayerGroup {
    this.hexagonLayer = new HexagonLayer({
      source,
      ...pick<any>(this.options, HexagonLayer.LayerOptionsKeys),
    });
    const layerGroup = new LayerGroup([this.hexagonLayer]);

    if (this.options.label) {
      this.labelLayer = this.createLabelLayer(this.source, this.options.label);
      layerGroup.addlayer(this.labelLayer);
    }

    return layerGroup;
  }

  /**
   * 更新图层
   */
  protected updateLayers(options: HexagonOptions) {
    const heatMapLayerConfig = pick<any>(options, HexagonLayer.LayerOptionsKeys);
    this.hexagonLayer.update(heatMapLayerConfig);

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
}
