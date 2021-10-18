import { pick, isEqual } from '@antv/util';
import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { ChoroplethOptions, DrillStep, ISource, IDrill, AreaDepthData, ViewLevel } from './interface';
import { DEFAULT_AREA_GRANULARITY, DEFAULT_OPTIONS, AREA_URL } from './constants';
import { AreaLayer } from '../../layers/area-layer';
import { LinesLayer } from '../../layers/lines-layer';
import { TextLayer } from '../../layers/text-layer';
import { ILabelOptions, ILegendOptions, IMouseEvent, Source } from '../../types';
import { LayerGroup } from '../../core/layer/layer-group';
import { createCountryBoundaryLayer } from './layer';
import { getCacheArea, registerCacheArea } from './cache';

export type { ChoroplethOptions };

export class Choropleth extends Plot<ChoroplethOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;
  /**
   * 图表类型
   */
  public type = Plot.MapType.Choropleth;
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
   * 行政层级数据
   */
  private areaDepthData: AreaDepthData[] = [];

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
  protected getDefaultOptions(): Partial<ChoroplethOptions> {
    return Choropleth.DefaultOptions;
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
      name: 'fillAreaLayer',
      source: this.source,
      ...pick<any>(this.options, AreaLayer.LayerOptionsKeys),
    });
    return fillAreaLayer;
  }

  /**
   * 创建数据标签图层
   */
  protected createLabelLayer(source: Source, label: ILabelOptions): TextLayer {
    const data = this.currentDistrictData.features
      .map(({ properties }) =>
        Object.assign({}, properties, { centroid: properties['centroid'] || properties['center'] })
      )
      .filter(({ centroid }) => centroid);
    const textLayer = new TextLayer({
      name: 'labelLayer',
      source: {
        data,
        parser: { type: 'json', coordinates: 'centroid' },
        transforms: this.source.transforms,
      },
      ...label,
    });

    this.source.on('update', () => {
      const data = this.currentDistrictData.features
        .map(({ properties }) => properties)
        .filter(({ centroid }) => centroid);
      textLayer.layer.setData(data);
    });

    return textLayer;
  }

  /**
   * 更新图层
   */
  protected updateLayers(options: ChoroplethOptions) {
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
    this.initDrillEvent();
  }

  /**
   * 初始化钻取事件
   */
  private initDrillEvent() {
    if (!this.options.drill) return;
    const { level, adcode, granularity = DEFAULT_AREA_GRANULARITY[level] } = this.options.initialView;
    const { steps, triggerUp = 'unclick', triggerDown = 'click' } = this.options.drill;
    const dillSteps = steps.map((step: DrillStep | DrillStep['level']) => {
      if (typeof step === 'string') {
        return {
          level: step,
          granularity: DEFAULT_AREA_GRANULARITY[step],
        };
      }
      if (!step.granularity) {
        step.granularity = DEFAULT_AREA_GRANULARITY[step.level] as DrillStep['granularity'];
      }
      return step;
    }) as Required<DrillStep>[];
    this.areaDepthData = [{ level, adcode, granularity, source: this.options.source, color: this.options.color }];

    // 下钻事件
    this.fillAreaLayer.on(triggerDown, (event: IMouseEvent) => this.drillDown(event, dillSteps));

    // 上卷事件
    this.fillAreaLayer.on(triggerUp, this.drillUp.bind(this));
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
  private async fetchData(level: string, adcode: string | number, granularity: string) {
    const fileName = `${adcode}_${level}_${granularity}`;
    const cacheArea = getCacheArea(fileName);
    if (cacheArea) {
      return cacheArea;
    }
    const baseUrl = this.options.url || AREA_URL;
    const response = await fetch(`${baseUrl}/${level}/${fileName}.json`);
    const data = response.json();
    registerCacheArea(fileName, data);
    return data;
  }

  /**
   * 请求初始化行政数据
   */
  private async getInitDistrictData() {
    const fetchChinaBoundaryData = this.fetchData('country', 'china', 'boundary');
    const { level, adcode, granularity = DEFAULT_AREA_GRANULARITY[level] } = this.options.initialView;
    console.log(' level, adcode, granularity: ', level, adcode, granularity);
    const fetchCurrentDistrictData = this.fetchData(level, adcode, granularity);

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
   */
  drillDown(event: IMouseEvent, dillSteps: Required<DrillStep>[]) {
    const { steps, onDown } = this.options.drill as IDrill;
    const properties = event.feature?.properties;
    const { adcode } = properties;
    const from = this.areaDepthData.slice(-1)[0];

    // 已经下钻到最后
    if (this.areaDepthData.length === steps.length + 1) {
      return;
    }

    // 还没有开始钻取 : 已开始下钻
    const depth = this.areaDepthData.length === 1 ? 0 : this.areaDepthData.length - 1;
    const { level, granularity, source = { data: [] }, color = this.options.color } = dillSteps[depth];
    const to: AreaDepthData = {
      level,
      adcode: adcode,
      granularity,
      source: Object.assign({}, this.options.source, source),
      color: typeof color === 'object' ? Object.assign({}, this.options.color, color) : color,
    };

    this.fetchData(to.level, adcode, to.granularity).then((currentDistrictData) => {
      if (currentDistrictData.features.length) {
        this.currentDistrictData = currentDistrictData;
        const { data, ...sourceConfig } = to.source;
        this.changeData(data, sourceConfig);
        // 下钻颜色配置不一样需要重新映射
        if (!isEqual(to.color, from.color)) {
          this.fillAreaLayer.updateOptions({ color: to.color });
        }
        this.areaDepthData.push(to);
      }
    });

    if (onDown) {
      onDown(
        pick(from, ['level', 'adcode', 'granularity']) as ViewLevel,
        pick(to, ['level', 'adcode', 'granularity']) as ViewLevel,
        properties
      );
    }
  }

  /**
   * 向上钻取
   */
  drillUp() {
    const { onUp } = this.options.drill as IDrill;
    // 已经上卷到最高层级
    if (this.areaDepthData.length === 1) {
      return;
    }
    const from = this.areaDepthData.pop() as AreaDepthData;
    const to = this.areaDepthData.slice(-1)[0];

    this.fetchData(to.level, to.adcode, to.granularity).then((currentDistrictData) => {
      this.currentDistrictData = currentDistrictData;
      const { data, ...sourceConfig } = to.source;
      this.changeData(data, sourceConfig);
      // 上卷颜色配置不一样需要重新映射
      if (!isEqual(to.color, from.color)) {
        this.fillAreaLayer.updateOptions({ color: to.color });
      }
    });

    if (onUp) {
      onUp(
        pick(from, ['level', 'adcode', 'granularity']) as ViewLevel,
        pick(to, ['level', 'adcode', 'granularity']) as ViewLevel
      );
    }
  }
}
