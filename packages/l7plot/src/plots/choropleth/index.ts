import { pick, isEqual } from '@antv/util';
import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import {
  ChoroplethOptions,
  DrillStep,
  ChoroplethSourceOptions,
  Drill,
  DrillStack,
  ViewLevel,
  DrillStepConfig,
} from './types';
import { DEFAULT_AREA_GRANULARITY, DEFAULT_OPTIONS, AREA_URL } from './constants';
import { AreaLayer } from '../../layers/area-layer';
import { LinesLayer } from '../../layers/lines-layer';
import { TextLayer } from '../../layers/text-layer';
import { LabelOptions, LegendOptions, MouseEvent, Source } from '../../types';
import { LayerGroup } from '../../core/layer/layer-group';
import { createCountryBoundaryLayer } from './layer';
import { getCacheArea, registerCacheArea } from './cache';
import { getDrillStepDefaultConfig, isEqualDrillSteps } from './helper';

export type { ChoroplethOptions };

export class Choropleth extends Plot<ChoroplethOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;
  /**
   * 图表类型
   */
  public type = Plot.PlotType.Choropleth;
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
   * 数据钻取路径
   */
  private drillSteps: DrillStep[] = [];
  /**
   * 行政层级数据
   */
  private drillStacks: DrillStack[] = [];

  /**
   * 初始化图层
   */
  protected initLayers() {
    this.getInitDistrictData().then(() => {
      this.source = this.createSource();
      this.render();
      this.inited = true;
    });
  }

  /**
   * 更新: 更新配置且重新渲染
   */
  public update(options: Partial<ChoroplethOptions>) {
    this.updateOption(options);
    if (options.map && !isEqual(this.lastOptions.map, this.options.map)) {
      this.updateMap(options.map);
    }
    const callback = () => {
      if (options.source && !isEqual(this.lastOptions.source, this.options.source)) {
        const { data, ...sourceConfig } = this.options.source;
        this.changeData(data, sourceConfig);
      }
      this.render();
    };
    if (options.viewLevel && !isEqual(this.lastOptions.viewLevel, this.options.viewLevel)) {
      this.getInitDistrictData().then(() => {
        callback();
      });
    } else {
      callback();
    }
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
  protected parserSourceConfig(source: ChoroplethSourceOptions) {
    const { data: joinData, joinBy, ...sourceCFG } = source;
    const { sourceField, geoField: targetField, geoData } = joinBy;
    const data = geoData || this.currentDistrictData || { type: 'FeatureCollection', features: [] };
    const config = { type: 'join', sourceField, targetField, data: joinData };
    if (sourceCFG.transforms) {
      sourceCFG.transforms.push(config);
    } else {
      sourceCFG.transforms = [config];
    }
    if (sourceCFG['parser']) {
      delete sourceCFG['parser'];
    }
    return { data, sourceCFG };
  }

  /**
   * 创建 source 实例
   */
  protected createSource() {
    const { data, sourceCFG } = this.parserSourceConfig(this.options.source);
    const source = new Source(data, sourceCFG);
    return source;
  }

  /**
   * 更新: 更新数据
   */
  public changeData(data: any[], cfg?: Partial<Omit<ChoroplethSourceOptions, 'data'>>) {
    this.options.source = deepAssign({}, this.options.source, { data, ...cfg });
    const { data: currentDistrictData, sourceCFG } = this.parserSourceConfig(this.options.source);
    this.source.setData(currentDistrictData, sourceCFG);
  }

  /**
   * 创建图层
   */
  protected createLayers(source: Source): LayerGroup {
    const { chinaBoundaryLayer, chinaDisputeBoundaryLayer } = createCountryBoundaryLayer(this.chinaBoundaryData);
    this.chinaBoundaryLayer = chinaBoundaryLayer;
    this.chinaDisputeBoundaryLayer = chinaDisputeBoundaryLayer;
    this.fillAreaLayer = new AreaLayer({
      name: 'fillAreaLayer',
      source,
      ...pick<any>(this.options, AreaLayer.LayerOptionsKeys),
    });

    const layerGroup = new LayerGroup([this.fillAreaLayer, this.chinaBoundaryLayer, this.chinaDisputeBoundaryLayer]);

    if (this.options.label) {
      this.labelLayer = this.createLabelLayer(source, this.options.label);
      layerGroup.addlayer(this.labelLayer);
    }

    return layerGroup;
  }

  /**
   * 创建数据标签图层
   */
  protected createLabelLayer(source: Source, label: LabelOptions): TextLayer {
    const data = source['originData'].features
      .map(({ properties }) =>
        Object.assign({}, properties, { centroid: properties['centroid'] || properties['center'] })
      )
      .filter(({ centroid }) => centroid);
    const textLayer = new TextLayer({
      name: 'labelLayer',
      source: {
        data,
        parser: { type: 'json', coordinates: 'centroid' },
        transforms: source.transforms,
      },
      ...label,
    });

    source.on('update', () => {
      const data = this.source['originData'].features
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
    const { steps, triggerUp = 'unclick', triggerDown = 'click' } = this.options.drill;
    const dillSteps = steps.map((step: DrillStep | DrillStep['level']) => {
      if (typeof step === 'string') {
        return {
          level: step,
          granularity: DEFAULT_AREA_GRANULARITY[step] as DrillStep['granularity'],
        };
      }
      if (!step.granularity) {
        step.granularity = DEFAULT_AREA_GRANULARITY[step.level] as DrillStep['granularity'];
      }
      return step;
    });
    // 初始化或钻取路径更新时
    if (!isEqualDrillSteps(dillSteps, this.drillSteps)) {
      this.drillSteps = dillSteps;
    }

    // 下钻事件
    this.fillAreaLayer.on(triggerDown, this.onDrillDownHander);
    // 上卷事件
    this.fillAreaLayer.on(triggerUp, this.onDrillUpHander);
  }

  /**
   * 实现 legend 配置项
   */
  public getLegendOptions(): LegendOptions {
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
   * 请求初始化区域数据
   */
  private async getInitDistrictData() {
    const fetchChinaBoundaryData = this.fetchData('country', 'china', 'boundary');
    const { level, adcode, granularity = DEFAULT_AREA_GRANULARITY[level] } = this.options.viewLevel;
    console.log(' level, adcode, granularity: ', level, adcode, granularity);
    const geoData = this.options.source.joinBy.geoData;
    const fetchCurrentDistrictData = geoData ? Promise.resolve(geoData) : this.fetchData(level, adcode, granularity);

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
   * 向下钻取事件回调
   */
  private onDrillDownHander = (event: MouseEvent) => {
    const { steps, onDown } = this.options.drill as Drill;
    const properties = event.feature?.properties;
    const { adcode } = properties;

    // 还没有开始钻取
    if (!this.drillStacks.length) {
      const { level, adcode, granularity = DEFAULT_AREA_GRANULARITY[level] } = this.options.viewLevel;
      const config = getDrillStepDefaultConfig(this.options);
      this.drillStacks = [{ level, adcode, granularity, config }];
    }

    // 已经下钻到最后
    if (this.drillStacks.length === steps.length + 1) {
      return;
    }

    // 已开始下钻
    const from = this.drillStacks.slice(-1)[0];
    const depth = this.drillStacks.length - 1;
    const { level, granularity = 'city', ...drillConfig } = this.drillSteps[depth];

    const downParams = {
      from: { level: from.level, adcode: from.adcode, granularity: from.granularity },
      to: { level, adcode, granularity, properties },
    };
    const callback = (config: DrillStepConfig = {}) => {
      const view = { level, adcode, granularity };
      const options = deepAssign({}, drillConfig, config);
      this.changeView(view, options).then((drillLastStack) => {
        if (drillLastStack) {
          this.drillStacks.push(drillLastStack);
          this.emit('drilldown', downParams);
        }
      });
    };

    if (onDown) {
      onDown(downParams.from, downParams.to, callback);
    } else {
      callback();
    }
  };

  /**
   * 向上钻取事件回调
   */
  private onDrillUpHander = () => {
    const { onUp } = this.options.drill as Drill;
    // 已经上卷到最高层级
    const isTopDrillStack = this.drillStacks.length === 0 || this.drillStacks.length === 1;
    if (isTopDrillStack) {
      return;
    }
    const from = this.drillStacks.pop() as DrillStack;
    const to = this.drillStacks.slice(-1)[0];
    const upParams = {
      from: { level: from.level, adcode: from.adcode, granularity: from.granularity },
      to: { level: to.level, adcode: to.adcode, granularity: to.granularity },
    };
    const callback = (config: DrillStepConfig = {}) => {
      const view = upParams.to;
      const options = deepAssign({}, to.config, config);
      this.changeView(view, options).then((drillLastStack) => {
        if (drillLastStack) {
          this.emit('drillup', upParams);
        }
      });
    };

    if (onUp) {
      onUp(upParams.from, upParams.to, callback);
    } else {
      callback();
    }
  };

  /**
   * 向下钻取方法
   */
  public drillDown(view: ViewLevel, config: DrillStepConfig = {}) {
    this.changeView(view, config);
    // .then((drillLastStack) => {
    //   this.drillStacks.push(drillLastStack);
    // });
  }

  /**
   * 向上钻取方法
   */
  public drillUp(view: ViewLevel, config: DrillStepConfig = {}) {
    this.changeView(view, config);
  }

  /**
   * 更新显示区域
   */
  public changeView(view: ViewLevel, config: DrillStepConfig = {}) {
    const { level, adcode, granularity = DEFAULT_AREA_GRANULARITY[level] } = view;
    return this.fetchData(level, adcode, granularity).then((currentDistrictData) => {
      if (!currentDistrictData.features.length) return;
      const drillLastStack: DrillStack = {
        level,
        adcode,
        granularity,
        config: deepAssign({}, getDrillStepDefaultConfig(this.options), config),
      };
      const { data = [], ...sourceConfig } = drillLastStack.config.source || {};
      this.currentDistrictData = currentDistrictData;
      this.changeData(data, sourceConfig);
      this.render();
      // // 钻取配置不一样需要重新映射
      // if (!isEqual(drillLastStack.config, from.config)) {
      //   const { color, style, state, label, tooltip } = drillLastStack.config;
      //   this.fillAreaLayer.updateOptions({ color, style, state });
      //   this.labelLayer?.updateOptions({ ...label });
      //   if (tooltip) {
      //     this.tooltip?.update(tooltip);
      //   }
      // }
      // this.options.viewLevel = view;
      return drillLastStack;
    });
  }
}
