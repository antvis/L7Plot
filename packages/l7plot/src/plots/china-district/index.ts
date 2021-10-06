import { pick } from '@antv/util';
import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { ChinaDistrictOptions, ISource } from './interface';
import { DEFAULT_AREA_GRANULARITY, DEFAULT_OPTIONS, DISTRICT_URL } from './constants';
import { AreaLayer } from '../../layers/area-layer';
import { LinesLayer } from '../../layers/lines-layer';
import { TextLayer } from '../../layers/text-layer';
import { ILabelOptions, ILegendOptions, Source } from '../../types';
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
  private chinaBoundaryData = { type: 'FeatureCollection', features: [] };
  /**
   * 当前行政数据数据
   */
  private currentDistrictData = { type: 'FeatureCollection', features: [] };
  /**
   * 国界图层
   */
  public chinaBoundaryLayer!: LinesLayer;
  /**
   * 国界争议图层
   */
  public chinaDisputeBoundaryLayer!: LinesLayer;
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
   * 解析 source 配置
   */
  protected parserSourceConfig(source: ISource) {
    const { data: joinData, joinBy, ...sourceCFG } = source;
    const { sourceField, targetField } = joinBy;
    const config = { type: 'join', sourceField, targetField, data: joinData };
    if (sourceCFG.transforms) {
      sourceCFG.transforms.push(config);
    } else {
      sourceCFG.transforms = [config];
    }
    if (sourceCFG['parser']) {
      delete sourceCFG['parser'];
    }
    return sourceCFG;
  }

  /**
   * 创建 source 实例
   */
  protected createSource() {
    const sourceCFG = this.parserSourceConfig(this.options.source);
    const data = this.currentDistrictData || { type: 'FeatureCollection', features: [] };
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
    const sourceCFG = this.parserSourceConfig(this.options.source);
    const data = this.currentDistrictData.features
      .map(({ properties }) => properties)
      .filter(({ centroid }) => centroid);
    const textLayer = new TextLayer({
      name: 'labelLayer',
      source: {
        data,
        parser: { type: 'json', coordinates: 'centroid' },
        transforms: sourceCFG.transforms,
      },
      ...label,
    });
    return textLayer;
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
    // this.fillAreaLayer.on()
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
    const fetchChinaBoundaryData = this.fetchData(DISTRICT_URL.ChinaBoundary);
    const { level, adCode, granularity } = this.options.initialView;
    const granularity_ = granularity || DEFAULT_AREA_GRANULARITY[level];
    console.log(' level, adCode, granularity: ', level, adCode, granularity);
    const fetchCurrentDistrictData = this.fetchData(
      `${DISTRICT_URL.Area}/${level}/${adCode}_${level}${granularity_ ? `_${granularity_}` : ''}.json`
    );

    try {
      [this.chinaBoundaryData, this.currentDistrictData] = await Promise.all([
        fetchChinaBoundaryData,
        fetchCurrentDistrictData,
      ]);
    } catch (err) {
      throw new Error(`Failed to get district data，${err}`);
    }
  }

  /**
   * 更新: 更新数据
   */
  public changeData(data: any[], cfg?: Omit<ISource, 'data'>) {
    this.options.source = deepAssign({}, this.options.source, { data, ...cfg });
    const sourceCFG = this.parserSourceConfig(this.options.source);
    this.source.setData(this.currentDistrictData, sourceCFG);
  }

  /**
   * 向下钻取
   * 自定义钻取交互行为时使用
   */
  drillDown() {
    //
  }

  /**
   * 向上钻取
   * 自定义钻取交互行为时使用
   */
  drillUp() {
    //
  }
}
