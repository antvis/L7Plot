import { isUndefined } from '@antv/util';
import { Map } from '../core/map';
import { Plot } from '../core/plot';
import { deepAssign } from '../utils';
import { L7PlotOptions, IPlotLayer } from '../types';
import { LayerGroup } from '../core/layer/layer-group';
import { LayerConfigType, LAYERS_MAP, PlotConfigType, PLOTS_MAP } from './types';

const DEFAULT_OPTIONS: Partial<L7PlotOptions> = {};

export class L7Plot extends Map<L7PlotOptions> {
  /**
   * 默认的 options 配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 图表实例
   */
  public plots: Plot<PlotConfigType>[] = [];

  constructor(container: string | HTMLDivElement, options: L7PlotOptions) {
    super(options);
    this.container = this.createContainer(container);

    this.theme = this.createTheme();
    this.scene = this.createScene();

    this.registerResources();
    this.render();
    this.inited = true;
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<L7PlotOptions> {
    return deepAssign({}, Map.DefaultOptions, L7Plot.DefaultOptions);
  }

  /**
   * 创建所有图层
   */
  protected createLayers(): LayerGroup {
    const layerGroup = new LayerGroup([]);

    const layers = this.options.layers || [];
    for (let index = 0; index < layers.length; index++) {
      const layer: IPlotLayer = this.createLayer(layers[index]);
      layerGroup.addLayer(layer);
    }

    return layerGroup;
  }

  /**
   * 创建图层实例
   */
  private createLayer(layerConfig: LayerConfigType) {
    const { type, ...options } = layerConfig;
    const LayerClass = LAYERS_MAP[type];
    if (isUndefined(LayerClass)) {
      throw new Error(`Don't exist ${type} layer`);
    }
    const layer: IPlotLayer = new (LayerClass as any)(options);
    return layer;
  }

  /**
   * 添加图层
   */
  public addLayer(layer: LayerConfigType | IPlotLayer) {
    const isLayerClass = (layer: LayerConfigType | IPlotLayer): layer is IPlotLayer => {
      return typeof layer['render'] === 'function';
    };
    if (isLayerClass(layer)) {
      super.addLayer(layer);
    } else {
      const plotLayer = this.createLayer(layer);
      super.addLayer(plotLayer);
    }
  }

  /**
   * 移除图层
   */
  public removeLayerByName(name: string) {
    const layer = this.layerGroup.getLayerByName(name);
    if (layer) {
      return this.layerGroup.removeLayer(layer);
    }
    return false;
  }

  /**
   * 更新图层
   */
  // protected updateLayers(layers: LayerConfigType[]) {
  //   //
  // }

  /**
   * 更新 Plot
   */
  // protected updatePlots(plots: PlotConfigType[]) {
  //   //
  // }

  /**
   * 渲染
   */
  public render() {
    const layerGroup = this.createLayers();
    if (this.inited) {
      this.layerGroup.removeAllLayer();
      layerGroup.addTo(this.scene);
      this.layerGroup = layerGroup;
      this.updateControls();
    } else {
      this.layerGroup = layerGroup;
      this.onLayersLoaded();
      layerGroup.addTo(this.scene);
    }
  }

  /**
   * 图层加载成功
   */
  private onLayersLoaded() {
    const onLoaded = () => {
      this.renderPlots();
      this.initControls();
      this.loaded = true;
      this.emit('loaded');
    };
    if (this.scene['sceneService'].loaded) {
      this.sceneLoaded = true;
      this.layersLoaded && onLoaded();
    } else {
      this.scene.once('loaded', () => {
        this.sceneLoaded = true;
        this.layersLoaded && onLoaded();
      });
    }
    if (this.layerGroup.isEmpty()) {
      this.layersLoaded = true;
    } else {
      this.layerGroup.once('inited-all', () => {
        this.layersLoaded = true;
        this.sceneLoaded && onLoaded();
      });
    }
  }

  /**
   * 渲染 plots
   */
  private renderPlots() {
    const plots = this.options.plots || [];
    for (let index = 0; index < plots.length; index++) {
      const plot = plots[index];
      const plotInstance = this.createPlot(plot);
      this.plots.push(plotInstance);
    }
  }

  /**
   * 创建 plot
   */
  private createPlot(plot: PlotConfigType) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { type, legend, layerMenu, ...options } = plot;
    const PlotClass = PLOTS_MAP[type];
    if (isUndefined(PlotClass)) {
      throw new Error(`Don't exist ${type} plot`);
    }
    const plotInstance: Plot<PlotConfigType> = new (PlotClass as any)(options);
    plotInstance.attachToScene(this.scene, this.theme);
    return plotInstance;
  }

  /**
   * 添加图表
   */
  public addPlot(plotConfig: PlotConfigType) {
    // TODO: duplicate plot
    const plotInstance = this.createPlot(plotConfig);
    this.plots.push(plotInstance);
  }

  /**
   * 获取所有图表
   */
  public getPlots(): Plot<PlotConfigType>[] {
    return this.plots;
  }

  /**
   * 根据图表名称获取图表
   */
  public getPlotByName(name: string): Plot<PlotConfigType> | undefined {
    return this.plots.find((plot) => plot.options?.name === name);
  }

  /**
   * 根据图表名称移除图表
   */
  public removePlotByName(name: string) {
    const layerIndex = this.plots.findIndex((plot) => plot.options?.name === name);
    if (layerIndex === -1) return false;
    const [plot] = this.plots.splice(layerIndex, 1);
    plot.unattachFromScene();
    return true;
  }

  /**
   * 移除所有的图表
   */
  public removeAllPlot() {
    this.plots.forEach((plot) => {
      plot.unattachFromScene();
    });
    this.plots = [];
  }
}
