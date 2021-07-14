import { pick } from '@antv/util';
import { ILayer } from '@antv/l7-core';
import { HeatMapOptions } from './interface';
import { MapWrapper } from '../../core/map';
import { DEFAULT_OPTIONS, POINT_LAYER_OPTIONS_KEYS } from './constants';
import { LabelLayerWrapper } from '../../layers/label-layer';
import { Source } from '../../types';
import { LayerGroup } from '../../core/layer/layer-group';
import { HeatmapLayerWrapper } from '../../layers/heatmap-layer';

export class HeatMap<O extends HeatMapOptions = HeatMapOptions> extends MapWrapper<O> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 地图类型
   */
  public type = MapWrapper.MapType.Heat;

  /**
   * heatmapLayerWrapper
   */
  protected heatmapLayerWrapper!: HeatmapLayerWrapper;

  /**
   * 热力图层
   */
  get heatMapLayer(): ILayer {
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
   * 带交互的内置图层
   */
  protected interactionInternalLayers = [this.heatMapLayer];

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<O> {
    return HeatMap.DefaultOptions;
  }

  /**
   * 获取内置图层名
   */
  protected getInternalLayerName() {
    return { heatmapLayerName: 'pointLayer', labeLayerName: 'labelLayer' };
  }

  /**
   * 创建内置图层
   */
  protected createInternalLayers(source: Source): LayerGroup {
    const { heatmapLayerName, labeLayerName } = this.getInternalLayerName();
    this.heatmapLayerWrapper = new HeatmapLayerWrapper({
      source,
      ...pick<any>(this.options, POINT_LAYER_OPTIONS_KEYS),
      name: heatmapLayerName,
    });
    const layerGroup = new LayerGroup([this.heatmapLayerWrapper.layer]);

    if (this.options.label) {
      this.labelLayerWrapper = new LabelLayerWrapper({ source, ...this.options.label, name: labeLayerName });
      layerGroup.addlayer(this.labelLayerWrapper.layer);
    }

    return layerGroup;
  }

  /**
   * 更新内置图层
   */
  protected updateInternalLayers(options: O) {
    const heatMapLayerConfig = pick<any>(options, POINT_LAYER_OPTIONS_KEYS);
    this.heatmapLayerWrapper.updateOptions(heatMapLayerConfig);

    if (options.label) {
      if (this.labelLayerWrapper) {
        this.labelLayerWrapper.updateOptions({ ...options.label });
      } else {
        const { labeLayerName } = this.getInternalLayerName();
        this.labelLayerWrapper = new LabelLayerWrapper({
          source: this.source,
          ...options.label,
          name: labeLayerName,
        });
        this.layerGroup.addlayer(this.labelLayerWrapper.layer);
      }
    } else {
      if (this.labelLayerWrapper) {
        this.layerGroup.removelayer(this.labelLayerWrapper.layer);
      }
    }
  }
}
