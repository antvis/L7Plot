import { pick } from '@antv/util';
import { Plot } from '../../core/plot';
import { ChinaDistrictOptions } from './interface';
import { DEFAULT_OPTIONS } from './constants';
import { AreaLayer } from '../../layers/area-layer';
import { ILegendOptions, Source } from '../../types';
import { LayerGroup } from '../../core/layer/layer-group';

export type { ChinaDistrictOptions };

export class ChinaDistrict extends Plot<ChinaDistrictOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 图表类型
   */
  public type = Plot.MapType.ChinaDistrict;

  /**
   * 填充面图层
   */
  public polygonLayer!: AreaLayer;

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<ChinaDistrictOptions> {
    return ChinaDistrict.DefaultOptions;
  }

  /**
   * 创建图层
   */
  protected createLayers(source: Source): LayerGroup {
    this.polygonLayer = new AreaLayer({
      source,
      ...pick<any>(this.options, AreaLayer.LayerOptionsKeys),
    });
    const layerGroup = new LayerGroup([this.polygonLayer]);

    return layerGroup;
  }

  /**
   * 更新图层
   */
  protected updateLayers(options: ChinaDistrictOptions) {
    const polygonLayerConfig = pick<any>(options, AreaLayer.LayerOptionsKeys);
    this.polygonLayer.updateOptions(polygonLayerConfig);
  }

  /**
   * 初始化图层事件
   */
  protected initLayerEvent() {
    //
  }

  /**
   * 实现 legend 配置项
   */
  public getLegendOptions(): ILegendOptions {
    const colorLegendItems = this.polygonLayer.getColorLegendItems();
    if (colorLegendItems.length !== 0) {
      return { type: 'category', items: colorLegendItems };
    }

    return {};
  }
}
