import { pick } from '@antv/util';
import { Plot } from '../../core/plot';
import { ChinaDistrictOptions } from './interface';
import { DEFAULT_OPTIONS, DISTRICT_URL } from './constants';
import { AreaLayer } from '../../layers/area-layer';
import { ILegendOptions, Source } from '../../types';
import { LayerGroup } from '../../core/layer/layer-group';
import { LineLayer } from '../../layers/line-layer';
import { createCountryBoundaryLayer } from './layer';

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
   * 国界数据
   */
  private chinaBoundaryData: any;
  /**
   * 国界图层
   */
  public chinaBoundaryLayer!: LineLayer;
  /**
   * 国界争议图层
   */
  public chinaDisputeBoundaryLayer!: LineLayer;
  /**
   * 填充面图层
   */
  public fillAreaLayer!: AreaLayer;

  /**
   * 初始化图层
   */
  protected initLayers() {
    this.getInitDistrictData().then(() => {
      this.render();
      this.inited = true;
    });
  }

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
    const { chinaBoundaryLayer, chinaDisputeBoundaryLayer } = createCountryBoundaryLayer(this.chinaBoundaryData);
    this.chinaBoundaryLayer = chinaBoundaryLayer;
    this.chinaDisputeBoundaryLayer = chinaDisputeBoundaryLayer;

    const layerGroup = new LayerGroup([this.chinaBoundaryLayer, this.chinaDisputeBoundaryLayer]);
    return layerGroup;
  }

  /**
   * 创建填充面图层
   */
  protected createFillAreaLayer(source: Source) {
    this.fetchData(DISTRICT_URL.ChinaBoundary).then((data) => console.log(data));
    this.fillAreaLayer = new AreaLayer({
      source,
      ...pick<any>(this.options, AreaLayer.LayerOptionsKeys),
    });
  }

  /**
   * 更新图层
   */
  protected updateLayers(options: ChinaDistrictOptions) {
    const polygonLayerConfig = pick<any>(options, AreaLayer.LayerOptionsKeys);
    this.fillAreaLayer.updateOptions(polygonLayerConfig);
  }

  /**
   * 初始化图层事件
   */
  protected initLayersEvent() {
    //
  }

  /**
   * 实现 legend 配置项
   */
  public getLegendOptions(): ILegendOptions {
    const colorLegendItems = this.fillAreaLayer.getColorLegendItems();
    if (colorLegendItems.length !== 0) {
      return { type: 'category', items: colorLegendItems };
    }

    return {};
  }

  /**
   * 请求数据
   */
  private async fetchData(url: string) {
    const response = await fetch(url);
    return await response.json();
  }

  /**
   * 请求初始化行政数据
   */
  private async getInitDistrictData() {
    try {
      this.chinaBoundaryData = await this.fetchData(DISTRICT_URL.ChinaBoundary);
    } catch (err) {
      throw new Error(`Failed to get chinaBoundary data，${err}`);
    }
  }
}
