import { Source } from '@antv/l7';
import { isEqual, pick } from '@antv/util';
import { LayerGroup } from '../../core/layer/layer-group';
import { Plot } from '../../core/plot';
import { AreaLayer } from '../../layers/area-layer';
import { PathLayer } from '../../layers/path-layer';
import { TextLayer } from '../../layers/text-layer';
import type { LabelOptions, LegendOptions, MouseEvent } from '../../types';
import { deepAssign } from '../../utils';
import { getCacheArea, registerCacheArea } from './cache';
import { DEFAULT_AREA_GRANULARITY, DEFAULT_OPTIONS, GEO_AREA_URL, GEO_DATA_URL } from './constants';
import { getDrillStepDefaultConfig, getGeoAreaConfig, isEqualDrillSteps, topojson2geojson } from './helper';
import { createCountryBoundaryLayer } from './layer';
import {
  ChoroplethOptions,
  ChoroplethSourceOptions,
  Drill,
  DrillStack,
  DrillStep,
  DrillStepConfig,
  FeatureCollection,
  ViewLevel,
} from './types';

export type { ChoroplethOptions };

export class Choropleth extends Plot<ChoroplethOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;
  /**
   * 地理数据地址
   */
  static GeoDataUrl = GEO_DATA_URL;
  /**
   * 行政数据地址
   */
  static GeoAreaUrl = GEO_AREA_URL;
  /**
   * 图表类型
   */
  public type = Plot.PlotType.Choropleth;
  /**
   * 国界数据
   */
  private chinaBoundaryData: FeatureCollection = { type: 'FeatureCollection', features: [] };
  /**
   * 当前行政数据数据
   */
  private currentDistrictData: FeatureCollection = { type: 'FeatureCollection', features: [] };
  /**
   * 国界图层
   */
  public chinaBoundaryLayer: PathLayer | undefined;
  /**
   * 港澳界图层
   */
  public chinaHkmBoundaryLayer: PathLayer | undefined;
  /**
   * 国界争议图层
   */
  public chinaDisputeBoundaryLayer: PathLayer | undefined;
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
   * 钻取栈数据
   */
  private drillStacks: DrillStack[] = [];

  /**
   * 初始化数据
   */
  protected initSource() {
    this.getInitDistrictData().then(() => {
      this.source = this.createSource();
      this.render();
      this.inited = true;
    });
  }

  /**
   * 渲染
   */
  public render() {
    if (this.inited) {
      this.scene.setEnableRender(true);
      this.scene.render();
    } else {
      const layerGroup = this.createLayers(this.source);
      this.layerGroup = layerGroup;
      if (this.scene['sceneService'].loaded) {
        this.onSceneLoaded();
      } else {
        this.scene.once('loaded', () => {
          this.onSceneLoaded();
        });
      }
      this.initLayersEvent();
    }
  }

  /**
   * 更新: 更新配置且重新渲染
   */
  public update(options: Partial<ChoroplethOptions>) {
    this.updateOption(options);
    if (options.map && !isEqual(this.lastOptions.map, this.options.map)) {
      this.updateMap(options.map);
    }

    // 下钻路径发生更新
    if (
      options.drill &&
      options.drill.enabled !== false &&
      !isEqual(this.lastOptions.drill?.steps, this.options.drill?.steps)
    ) {
      this.drillReset();
      this.initDrillEvent();
    }

    this.scene.setEnableRender(false);

    // 行政级别及范围发生更新
    if (options.viewLevel && !isEqual(this.lastOptions.viewLevel, this.options.viewLevel)) {
      const geoData = options.source?.joinBy.geoData;
      this.getDistrictData(geoData).then(() => {
        const { data, ...sourceConfig } = this.options.source;
        this.changeData(data, sourceConfig);
        this.updateLayers(options);
        this.render();
        this.updateComponents();
        this.emit('update');
      });
    } else {
      if (options.source && !isEqual(this.lastOptions.source, this.options.source)) {
        const { data, ...sourceConfig } = this.options.source;
        this.changeData(data, sourceConfig);
      }
      this.updateLayers(options);
      this.render();
      this.updateComponents();
      this.emit('update');
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
    const data = geoData;
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
    const { data: geoData, sourceCFG } = this.parserSourceConfig(this.options.source);
    this.source.setData(geoData, sourceCFG);

    this.emit('change-data');
  }

  /**
   * 创建图层
   */
  protected createLayers(source: Source): LayerGroup {
    this.fillAreaLayer = new AreaLayer({
      name: 'fillAreaLayer',
      source,
      ...pick<any>(this.options, AreaLayer.LayerOptionsKeys),
    });

    const layerGroup = new LayerGroup([this.fillAreaLayer]);

    if (this.options.chinaBorder) {
      const layers = this.createCountryBoundaryLayer(this.chinaBoundaryData, this.options);

      layers.forEach((layer) => layerGroup.addLayer(layer));
    }

    if (this.options.label) {
      this.labelLayer = this.createLabelLayer(source, this.options.label);
      layerGroup.addLayer(this.labelLayer);
    }

    return layerGroup;
  }

  /**
   * 创建中国国界线图层
   */
  private createCountryBoundaryLayer(data: FeatureCollection, plotConfig?: ChoroplethOptions) {
    const { chinaBoundaryLayer, chinaHkmBoundaryLayer, chinaDisputeBoundaryLayer } = createCountryBoundaryLayer(
      data,
      plotConfig,
    );
    this.chinaBoundaryLayer = chinaBoundaryLayer;
    this.chinaHkmBoundaryLayer = chinaHkmBoundaryLayer;
    this.chinaDisputeBoundaryLayer = chinaDisputeBoundaryLayer;
    return [chinaBoundaryLayer, chinaHkmBoundaryLayer, chinaDisputeBoundaryLayer];
  }

  /**
   * 创建数据标签图层
   */
  protected createLabelLayer(source: Source, label: LabelOptions): TextLayer {
    const data = source['originData'].features
      .map(({ properties }) =>
        Object.assign({}, properties, { centroid: properties['centroid'] || properties['center'] }),
      )
      .filter(({ centroid }) => centroid);
    const { visible, minZoom, maxZoom, zIndex = 0 } = this.options;
    const textLayer = new TextLayer({
      name: 'labelLayer',
      source: {
        data,
        parser: { type: 'json', coordinates: 'centroid' },
        transforms: source.transforms,
      },
      visible,
      minZoom,
      maxZoom,
      zIndex: zIndex + 0.1,
      ...label,
    });

    const updateCallback = () => {
      const data = this.source['originData'].features
        .map(({ properties }) => properties)
        .filter(({ centroid }) => centroid);
      textLayer.layer.setData(data, { transforms: source.transforms });
    };

    source.on('update', updateCallback);
    textLayer.on('remove', () => {
      source.off('update', updateCallback);
    });

    return textLayer;
  }

  /**
   * 更新图层
   */
  protected updateLayers(options: Partial<ChoroplethOptions>) {
    const fillAreaLayerConfig = pick<any>(options, AreaLayer.LayerOptionsKeys);
    this.fillAreaLayer.update(fillAreaLayerConfig);

    const createCountryBoundaryLayer = () => {
      const layers = this.createCountryBoundaryLayer(this.chinaBoundaryData, this.options);

      layers.forEach((layer) => this.layerGroup.addLayer(layer));
    };
    const removeCountryBoundaryLayer = () => {
      this.chinaBoundaryLayer && this.layerGroup.removeLayer(this.chinaBoundaryLayer);
      this.chinaHkmBoundaryLayer && this.layerGroup.removeLayer(this.chinaHkmBoundaryLayer);
      this.chinaDisputeBoundaryLayer && this.layerGroup.removeLayer(this.chinaDisputeBoundaryLayer);
    };

    if (options.chinaBorder) {
      if (!this.chinaBoundaryLayer) {
        createCountryBoundaryLayer();
      } else {
        removeCountryBoundaryLayer();
        createCountryBoundaryLayer();
      }
    } else if (options.chinaBorder === false) {
      removeCountryBoundaryLayer();
    }

    this.updateLabelLayer(this.source, options.label, this.options, this.labelLayer);
  }

  /**
   * 初始化图层事件
   */
  protected initLayersEvent() {
    this.initDrillEvent();
    this.initLegendEvent();
  }

  /**
   * 初始化钻取事件
   */
  private initDrillEvent() {
    // 更新：取消上次绑定事件
    if (this.lastOptions.drill) {
      const { triggerUp = 'unclick', triggerDown = 'click' } = this.lastOptions.drill;
      this.fillAreaLayer.off(triggerUp, this.onDrillUpHander);
      this.fillAreaLayer.off(triggerDown, this.onDrillDownHander);
    }
    // 没有下钻
    if (!this.options.drill || this.options.drill.enabled === false) {
      return;
    }

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
      this.drillStacks = [];
    }

    // 初始化钻取栈第一钻数据
    if (!this.drillStacks.length) {
      const { level, adcode, granularity = DEFAULT_AREA_GRANULARITY[level] } = this.options.viewLevel;
      const config = getDrillStepDefaultConfig(this.options);
      this.drillStacks = [{ level, adcode, granularity, config }];
    }

    // 上卷事件
    this.fillAreaLayer.on(triggerUp, this.onDrillUpHander);
    // 下钻事件
    this.fillAreaLayer.on(triggerDown, this.onDrillDownHander);
  }

  /**
   * 初始化图例事件
   */
  private initLegendEvent() {
    const legend = this.options.legend;
    if (!legend) return;
    const onUpdateLegendData = () => {
      this.updateLegendControl(legend);
    };
    this.fillAreaLayer.on('legend:color', onUpdateLegendData);
  }

  /**
   * 重置钻取缓存数据
   */
  private drillReset() {
    this.drillStacks = [];
  }

  /**
   * 获取当前已钻取层级数据
   */
  public getCurrentDrillSteps() {
    const steps = this.drillStacks.map((item) => pick(item, ['level', 'adcode', 'granularity']) as Required<ViewLevel>);

    return steps;
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
    if (cacheArea) return cacheArea;
    const { url, type, extension } = getGeoAreaConfig(this.options.geoArea);

    let data: any;
    const customFetchGeoData = this.options.customFetchGeoData;
    if (customFetchGeoData) {
      data = await customFetchGeoData({ url, level, adcode, granularity, extension });
    } else {
      const response = await fetch(`${url}/${level}/${fileName}.${extension}`);
      data = await response.json();
    }

    if (type === 'topojson') {
      data = topojson2geojson(data);
    }

    registerCacheArea(fileName, data);
    return data;
  }

  /**
   * 请求初始化区域数据
   */
  private async getInitDistrictData() {
    const fetchChinaBoundaryData = this.fetchData('country', '100000', 'boundary');
    const geoData = this.options.source?.joinBy.geoData;

    try {
      [this.chinaBoundaryData] = await Promise.all([fetchChinaBoundaryData, this.getDistrictData(geoData)]);
    } catch (err) {
      throw new Error(`Failed to get china boundary data，${err}`);
    }
  }

  /**
   * 请求区域数据
   */
  private async getDistrictData(geoData?: FeatureCollection) {
    const { level, adcode, granularity = DEFAULT_AREA_GRANULARITY[level] } = this.options.viewLevel;
    const fetchCurrentDistrictData = geoData ? Promise.resolve(geoData) : this.fetchData(level, adcode, granularity);

    try {
      this.currentDistrictData = await fetchCurrentDistrictData;
      this.options.source = deepAssign({}, this.options.source, { joinBy: { geoData: this.currentDistrictData } });
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

    // 已经下钻到最后
    if (this.drillStacks.length === steps.length + 1) {
      return;
    }

    // 已开始下钻
    const from = this.drillStacks.slice(-1)[0];
    const depth = this.drillStacks.length - 1;
    const { level, granularity = DEFAULT_AREA_GRANULARITY[level], ...drillConfig } = this.drillSteps[depth];

    const downParams = {
      nativeEvent: true,
      from: { level: from.level, adcode: from.adcode, granularity: from.granularity },
      to: { level, adcode, granularity, properties },
    };
    const callback = (config: DrillStepConfig = {}) => {
      const view = { level, adcode, granularity };
      const mergeConfig = deepAssign({}, drillConfig, config);
      this.changeView(view, mergeConfig).then((drillData) => {
        if (drillData) {
          this.drillStacks.push(drillData);
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

    const lastIndex = this.drillStacks.length - 1;
    const from = this.drillStacks[lastIndex];
    const to = this.drillStacks[lastIndex - 1];
    const upParams = {
      nativeEvent: true,
      from: { level: from.level, adcode: from.adcode, granularity: from.granularity },
      to: { level: to.level, adcode: to.adcode, granularity: to.granularity },
    };
    const callback = (config: DrillStepConfig = {}) => {
      const view = upParams.to;
      const mergeConfig = deepAssign({}, to.config, config);
      this.changeView(view, mergeConfig).then((drillData) => {
        if (drillData) {
          this.drillStacks.pop();
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
    const from = this.drillStacks.slice(-1)[0];
    const { level, adcode, granularity } = view;
    const downParams = {
      nativeEvent: false,
      from: { level: from.level, adcode: from.adcode, granularity: from.granularity },
      to: { level, adcode, granularity },
    };

    // TODO: remove view
    this.changeView(view, config).then((drillData) => {
      if (drillData) {
        this.drillStacks.push(drillData);
        this.emit('drilldown', downParams);
      }
    });
  }

  /**
   * 向上钻取方法
   */
  public drillUp(config: DrillStepConfig = {}, level?: ViewLevel['level']) {
    // 已经上卷到最高层级
    const drillStacksLength = this.drillStacks.length;
    const isTopDrillStack = [0, 1].includes(drillStacksLength);
    if (isTopDrillStack) {
      return;
    }
    const customUpStackIndex = level ? this.drillStacks.findIndex((item) => item.level === level) : -1;
    const isCustomUp = customUpStackIndex !== -1;
    const stacksIndex = isCustomUp ? customUpStackIndex : drillStacksLength - 2;
    const { config: drillConfig, ...view } = this.drillStacks[stacksIndex];
    const mergeConfig = deepAssign({}, drillConfig, config);

    const from = this.drillStacks[this.drillStacks.length - 1];
    const upParams = {
      nativeEvent: false,
      from: { level: from.level, adcode: from.adcode, granularity: from.granularity },
      to: { level: view.level, adcode: view.adcode, granularity: view.granularity },
    };

    this.changeView(view, mergeConfig).then((drillData) => {
      if (drillData) {
        if (isCustomUp) {
          this.drillStacks.splice(customUpStackIndex + 1);
        } else {
          this.drillStacks.pop();
        }
        this.emit('drillup', upParams);
      }
    });
  }

  /**
   * 更新显示区域
   */
  public async changeView(view: ViewLevel, config: DrillStepConfig = {}) {
    const { level, adcode, granularity = DEFAULT_AREA_GRANULARITY[level] } = view;
    const geoData = await this.fetchData(level, adcode, granularity);
    if (!geoData.features.length) return;
    const mergeConfig = deepAssign({}, getDrillStepDefaultConfig(this.options), config, {
      viewLevel: { level, adcode, granularity },
      source: { joinBy: { geoData } },
    });

    this.update(mergeConfig);

    const drillData: DrillStack = {
      level,
      adcode,
      granularity,
      config: mergeConfig,
    };
    return drillData;
  }
}
