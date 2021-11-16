import { isUndefined } from '@antv/util';
import { Map } from '../core/map';
import { Plot } from '../core/plot';
import { deepAssign } from '../utils';
import { L7PlotOptions, IPLotLayer } from '../types';
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
  private plots: Plot<any>[] = [];

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
   * 创建图层
   */
  protected createLayers(): LayerGroup {
    const layerGroup = new LayerGroup([]);

    const layers = this.options.layers || [];
    for (let index = 0; index < layers.length; index++) {
      const { type, ...options } = layers[index];
      const LayerClass = LAYERS_MAP[type];
      if (isUndefined(LayerClass)) {
        throw new Error(`Don't exist ${type} layer`);
      }
      const layer: IPLotLayer = new (LayerClass as any)(options);
      layerGroup.addlayer(layer);
    }

    return layerGroup;
  }

  /**
   * 更新图层
   */
  protected updateLayers(layers: LayerConfigType[]) {
    //
  }

  /**
   * 更新 Plot
   */
  protected updatePlots(plots: PlotConfigType[]) {
    //
  }

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
   * 渲染 plot
   */
  private renderPlot(plot: PlotConfigType) {
    const { type, legend, layerMenu, ...options } = plot;
    const PlotClass = PLOTS_MAP[type];
    if (isUndefined(PlotClass)) {
      throw new Error(`Don't exist ${type} plot`);
    }
    const plotInstance: Plot<any> = new (PlotClass as any)(options);
    plotInstance.attachToScene(this.scene, this.theme);
    this.plots.push(plotInstance);
  }

  /**
   * 渲染 plots
   */
  public renderPlots() {
    const plots = this.options.plots || [];
    for (let index = 0; index < plots.length; index++) {
      const plot = plots[index];
      this.renderPlot(plot);
    }
  }

  /**
   * 添加图表
   */
  addPlot(plot: PlotConfigType) {
    // TODO: duplicate plot
    this.renderPlot(plot);
  }

  /**
   * 移除图表
   */
  // public removePlot(name: string) {}
}
