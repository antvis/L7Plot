import { pick } from '@antv/util';
import { Plot } from '../../core/plot';
import { ChinaDistrictOptions } from './interface';
import { DEFAULT_OPTIONS, DISTRICT_URL } from './constants';
import { AreaLayer } from '../../layers/area-layer';
import { LineLayer } from '../../layers/line-layer';
import { TextLayer } from '../../layers/text-layer';
import { ILabelOptions, ILegendOptions, ISourceCFG, Source } from '../../types';
import { LayerGroup } from '../../core/layer/layer-group';
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
   * 省份数据
   */
  private provinceData: any;
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
   * 标注图层
   */
  public labelLayer: TextLayer | undefined;

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
   * 创建 source 实例
   */
  protected createSource() {
    const { data: joinData, joinBy, ...sourceCFG } = this.options.source;
    const { sourceField, targetField, data = { type: 'FeatureCollection', features: [] } } = joinBy;
    const config = { type: 'join', sourceField, targetField, data: joinData };
    if (sourceCFG.transforms) {
      sourceCFG.transforms.push(config);
    } else {
      sourceCFG.transforms = [config];
    }
    const source = new Source(data, sourceCFG);
    return source;
  }

  /**
   * 创建图层
   */
  protected createLayers(source: Source): LayerGroup {
    const { chinaBoundaryLayer, chinaDisputeBoundaryLayer } = createCountryBoundaryLayer(this.chinaBoundaryData);
    this.chinaBoundaryLayer = chinaBoundaryLayer;
    this.chinaDisputeBoundaryLayer = chinaDisputeBoundaryLayer;
    // this.fillAreaLayer = new AreaLayer({
    //   source: { data: this.provinceData },
    //   ...pick<any>(this.options, AreaLayer.LayerOptionsKeys),
    // });
    this.fillAreaLayer = this.createFillAreaLayer();

    const layerGroup = new LayerGroup([this.fillAreaLayer, this.chinaBoundaryLayer, this.chinaDisputeBoundaryLayer]);

    if (this.options.label) {
      this.labelLayer = this.createLabelLayer(source, this.options.label);
      layerGroup.addlayer(this.labelLayer);
    }

    return layerGroup;
  }

  /**
   * 创建填充面图层
   */
  protected createFillAreaLayer() {
    this.source = this.createSource();
    const fillAreaLayer = new AreaLayer({
      source: this.source,
      ...pick<any>(this.options, AreaLayer.LayerOptionsKeys),
    });
    return fillAreaLayer;
  }

  /**
   * 创建数据标签图层
   */
  protected createLabelLayer(source: Source, label: ILabelOptions): TextLayer {
    // TODO: get source.data center
    const labelLayerWrapper = new TextLayer({ name: 'labelLayer', source, ...label });
    return labelLayerWrapper;
  }

  /**
   * 更新图层
   */
  protected updateLayers(options: ChinaDistrictOptions) {
    const fillAreaLayerConfig = pick<any>(options, AreaLayer.LayerOptionsKeys);
    this.fillAreaLayer.updateOptions(fillAreaLayerConfig);

    if (options.label) {
      if (this.labelLayer) {
        this.labelLayer.updateOptions({ ...options.label });
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

    try {
      this.provinceData = await this.fetchData(DISTRICT_URL.Province);
      this.options.source.joinBy.data = this.provinceData;
    } catch (err) {
      throw new Error(`Failed to get provinceData data，${err}`);
    }
  }

  /**
   * 更新: 更新数据
   */
  public changeData(data: any, cfg?: ISourceCFG) {
    // TODO: deepAssign old cfg
    this.source.setData(data, cfg);
  }
}
