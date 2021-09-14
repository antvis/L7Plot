import { LayerGroup } from '../core/layer/layer-group';
import { Map } from '../core/map';
import { IL7PlotOptions } from '../types';

const DEFAULT_OPTIONS: Partial<IL7PlotOptions> = {};

export class L7Plot extends Map<IL7PlotOptions> {
  /**
   * 默认的 options 配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  constructor(container: string | HTMLDivElement, options: IL7PlotOptions) {
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
  protected getDefaultOptions(): Partial<IL7PlotOptions> {
    return Map.DefaultOptions;
  }

  /**
   * 创建图层
   */
  protected createLayers(): LayerGroup {
    const layerGroup = new LayerGroup([]);

    return layerGroup;
  }

  /**
   * 更新图层
   */
  protected updateLayers(options: Partial<IL7PlotOptions>) {
    //
  }

  /**
   * 渲染
   */
  public render() {
    this.renderPlots();
  }

  /**
   * 渲染 plots
   */
  public renderPlots() {
    const plots = this.options.plots || [];
    for (let index = 0; index < plots.length; index++) {
      const plot = plots[index];
    }
  }

  /**
   * 渲染 layers
   */
  public renderLayers() {
    const layers = this.options.layers || [];
    //
  }
}
