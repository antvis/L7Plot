import { pick } from '@antv/util';
import { ILayer } from '@antv/l7-core';
import { MapWrapper } from '../../core/map';
import { BubbleMapOptions } from './interface';
import { DEFAULT_OPTIONS } from './constants';
import { LayerGroup } from '../../core/layer/layer-group';
import { Source } from '../../types';
import { PointLayerWrapper } from '../../layers/point-layer';
import { LabelLayerWrapper } from '../../layers/label-layer';
import { POINT_LAYER_OPTIONS_KEYS } from '../point-map/constants';
import { PointMap } from '../point-map';

export class BubbleMap_ extends MapWrapper<BubbleMapOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 地图类型
   */
  public type = MapWrapper.MapType.Bubble;

  /**
   * bobbleLayerWrapper
   */
  private bobbleLayerWrapper: PointLayerWrapper | undefined;

  /**
   * 气泡图层
   */
  get bobbleLayer(): ILayer | undefined {
    return this.bobbleLayerWrapper?.layer;
  }

  /**
   * labelLayerWrapper
   */
  private labelLayerWrapper: LabelLayerWrapper | undefined;

  /**
   * 标注图层
   */
  get labelLayer(): ILayer | undefined {
    return this.labelLayerWrapper?.layer;
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<BubbleMapOptions> {
    return BubbleMap.DefaultOptions;
  }

  /**
   * 创建内置图层
   */
  protected createInternalLayers(source: Source): LayerGroup {
    this.bobbleLayerWrapper = new PointLayerWrapper({ source, ...pick<any>(this.options, POINT_LAYER_OPTIONS_KEYS) });
    const layerGroup = new LayerGroup([this.bobbleLayerWrapper.layer]);

    if (this.options.label) {
      this.labelLayerWrapper = new LabelLayerWrapper({ source, ...this.options.label });
      layerGroup.addlayer(this.labelLayerWrapper.layer);
    }

    return layerGroup;
  }

  /**
   * 更新内置图层
   */
  protected updateInternalLayers(options: BubbleMapOptions) {
    const pointLayerConfig = pick<any>(options, POINT_LAYER_OPTIONS_KEYS);
    const labelLayerConfig = { ...options.label };

    this.bobbleLayerWrapper?.updateOption(pointLayerConfig);
    this.labelLayerWrapper?.updateOption(labelLayerConfig);
  }
}

export class BubbleMap extends PointMap {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 地图类型
   */
  public type = MapWrapper.MapType.Bubble;

  /**
   * 气泡图层
   */
  get bobbleLayer(): ILayer | undefined {
    return this.pointLayerWrapper?.layer;
  }

  /**
   * 标注图层
   */
  get labelLayer(): ILayer | undefined {
    return this.labelLayerWrapper?.layer;
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<BubbleMapOptions> {
    return BubbleMap.DefaultOptions;
  }
}
