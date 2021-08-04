import { LayerGroup } from '../core/layer/layer-group';
import { Map } from '../core/map';
import { IL7PlotOptions, Source } from '../types';

const DEFAULT_OPTIONS: Partial<IL7PlotOptions> = {};

export class L7Plot extends Map<IL7PlotOptions> {
  /**
   * 默认的 options 配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<IL7PlotOptions> {
    return Map.DefaultOptions;
  }

  /**
   * 创建图层之前 hook
   */
  protected beforeCreateLayers(options: IL7PlotOptions) {
    return { options };
  }

  /**
   * 创建图层
   */
  protected createLayers(source: Source): LayerGroup {
    const options = this.beforeCreateLayers(this.options);
    const layerGroup = new LayerGroup([]);

    return layerGroup;
  }

  /**
   * 更新图层
   */
  protected updateLayers(options: Partial<IL7PlotOptions>) {
    //
  }
}
