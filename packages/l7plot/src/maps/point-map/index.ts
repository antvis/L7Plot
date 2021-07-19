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
  protected pointLayerWrapper!: PointLayerWrapper;

  /**
   * 点图层
   */
  get pointLayer(): ILayer {
    return this.pointLayerWrapper.layer;
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
  protected interactionInternalLayers = [this.pointLayer];

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
    return { pointLayerName: 'pointLayer', labeLayerName: 'labelLayer' };
  }

  /**
   * 创建内置图层
   */
  protected createInternalLayers(source: Source): LayerGroup {
    const { pointLayerName, labeLayerName } = this.getInternalLayerName();
    this.pointLayerWrapper = new PointLayerWrapper({
      source,
      ...pick<any>(this.options, POINT_LAYER_OPTIONS_KEYS),
      name: pointLayerName,
    });
    const layerGroup = new LayerGroup([this.pointLayerWrapper.layer]);

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
    const pointLayerConfig = pick<any>(options, POINT_LAYER_OPTIONS_KEYS);
    this.pointLayerWrapper.updateOptions(pointLayerConfig);

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
