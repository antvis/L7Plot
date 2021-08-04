import { pick } from '@antv/util';
import { HeatmapOptions } from './interface';
import { Plot } from '../../core/plot';
import { DEFAULT_OPTIONS, POINT_LAYER_OPTIONS_KEYS } from './constants';
import { LabelLayerWrapper } from '../../layers/label-layer';
import { ILayer, Source } from '../../types';
import { LayerGroup } from '../../core/layer/layer-group';
import { HeatmapLayerWrapper } from '../../layers/heatmap-layer';

export class Heatmap<O extends HeatmapOptions = HeatmapOptions> extends Plot<O> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 地图类型
   */
  public type = Plot.MapType.Heat;

  /**
   * heatmapLayerWrapper
   */
  protected heatmapLayerWrapper!: HeatmapLayerWrapper;

  /**
   * 热力图层
   */
  get heatmapLayer(): ILayer {
    return this.heatmapLayerWrapper.layer;
  }

  /**
   * labelLayerWrapper
   */
  protected labelLayerWrapper: LabelLayerWrapper | undefined;

  /**
   * 标注图层
   */
  get labelLayer(): ILayer | undefined {
    return this.labelLayerWrapper?.layer;
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<O> {
    return Heatmap.DefaultOptions;
  }

  /**
   * 创建图层之前 hook
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected beforeCreateLayers(options: O) {
    const heatmapLayerConfig = { name: 'heatmapLayer' };

    return { heatmapLayerConfig };
  }

  /**
   * 创建图层
   */
  protected createLayers(source: Source): LayerGroup {
    const { heatmapLayerConfig } = this.beforeCreateLayers(this.options);
    this.heatmapLayerWrapper = new HeatmapLayerWrapper({
      source,
      ...pick<any>(this.options, POINT_LAYER_OPTIONS_KEYS),
      ...heatmapLayerConfig,
    });
    const layerGroup = new LayerGroup([this.heatmapLayerWrapper.layer]);

    if (this.options.label) {
      this.labelLayerWrapper = this.createLabelLayer(this.source, this.options.label);
      layerGroup.addlayer(this.labelLayerWrapper.layer);
    }

    this.interactionLayers = [this.heatmapLayerWrapper.layer];

    return layerGroup;
  }

  /**
   * 更新图层
   */
  protected updateLayers(options: O) {
    const heatMapLayerConfig = pick<any>(options, POINT_LAYER_OPTIONS_KEYS);
    this.heatmapLayerWrapper.updateOptions(heatMapLayerConfig);

    if (options.label) {
      if (this.labelLayerWrapper) {
        this.labelLayerWrapper.updateOptions({ ...options.label });
      } else {
        this.labelLayerWrapper = this.createLabelLayer(this.source, options.label);
        this.layerGroup.addlayer(this.labelLayerWrapper.layer);
      }
    } else {
      if (this.labelLayerWrapper) {
        this.layerGroup.removelayer(this.labelLayerWrapper.layer);
      }
    }
  }
}
