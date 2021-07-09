import { pick } from '@antv/util';
import { ILayer } from '@antv/l7-core';
import { PointMapOptions } from './interface';
import { MapWrapper } from '../../core/map';
import { DEFAULT_OPTIONS, POINT_LAYER_OPTIONS_KEYS } from './constants';
import { PointLayerWrapper } from '../../layers/point-layer';
import { LabelLayerWrapper } from '../../layers/label-layer';
import { Source } from '../../types';
import { LayerGroup } from '../../core/layer/layer-group';

export class PointMap<O extends PointMapOptions = PointMapOptions> extends MapWrapper<O> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 地图类型
   */
  public type = MapWrapper.MapType.Point;

  /**
   * pointLayerWrapper
   */
  protected pointLayerWrapper: PointLayerWrapper | undefined;

  /**
   * 点图层
   */
  get pointLayer(): ILayer | undefined {
    return this.pointLayerWrapper?.layer;
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
    return PointMap.DefaultOptions;
  }

  /**
   * 获取内置图层名
   */
  protected getInternalLayerName() {
    const pointLayerName = 'pointLayer';
    return { pointLayerName };
  }

  /**
   * 创建内置图层
   */
  protected createInternalLayers(source: Source): LayerGroup {
    const { pointLayerName } = this.getInternalLayerName();
    this.pointLayerWrapper = new PointLayerWrapper({
      source,
      ...pick<any>(this.options, POINT_LAYER_OPTIONS_KEYS),
      name: pointLayerName,
    });
    const layerGroup = new LayerGroup([this.pointLayerWrapper.layer]);

    if (this.options.label) {
      this.labelLayerWrapper = new LabelLayerWrapper({ source, ...this.options.label, name: 'labelLayer' });
      layerGroup.addlayer(this.labelLayerWrapper.layer);
    }

    return layerGroup;
  }

  /**
   * 更新内置图层
   */
  protected updateInternalLayers(options: O) {
    const pointLayerConfig = pick<any>(options, POINT_LAYER_OPTIONS_KEYS);
    const labelLayerConfig = { ...options.label };

    this.pointLayerWrapper?.updateOptions(pointLayerConfig);
    this.labelLayerWrapper?.updateOptions(labelLayerConfig);
  }
}
