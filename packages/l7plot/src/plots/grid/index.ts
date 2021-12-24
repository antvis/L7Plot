import { pick } from '@antv/util';
import { Plot } from '../../core/plot';
import { GridOptions } from './types';
import { DEFAULT_OPTIONS } from './constants';
import { Source } from '../../types';
import { TextLayer } from '../../layers/text-layer';
import { GridLayer } from '../../layers/grid-layer';
import { LayerGroup } from '../../core/layer/layer-group';

export type { GridOptions };

export class Grid extends Plot<GridOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 地图类型
   */
  public type = Plot.PlotType.Grid;

  /**
   * 网格图层
   */
  public gridLayer!: GridLayer;

  /**
   * 标注图层
   */
  public labelLayer: TextLayer | undefined;

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<GridOptions> {
    return Grid.DefaultOptions;
  }

  /**
   * 创建图层
   */
  protected createLayers(source: Source): LayerGroup {
    this.gridLayer = new GridLayer({
      source,
      ...pick<any>(this.options, GridLayer.LayerOptionsKeys),
    });
    const layerGroup = new LayerGroup([this.gridLayer]);

    if (this.options.label) {
      this.labelLayer = this.createLabelLayer(this.source, this.options.label, this.options);
      layerGroup.addLayer(this.labelLayer);
    }

    return layerGroup;
  }

  /**
   * 更新图层
   */
  protected updateLayers(options: GridOptions) {
    const heatMapLayerConfig = pick<any>(options, GridLayer.LayerOptionsKeys);
    this.gridLayer.update(heatMapLayerConfig);

    this.updateLabelLayer(this.source, options.label, this.options, this.labelLayer);
  }
}
