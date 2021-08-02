import { pick } from '@antv/util';
import { PointMapOptions } from './interface';
import { MapWrapper } from '../../core/map';
import { DEFAULT_OPTIONS, POINT_LAYER_OPTIONS_KEYS } from './constants';
import { PointLayerWrapper } from '../../layers/point-layer';
import { LabelLayerWrapper } from '../../layers/label-layer';
import { ILayer, ILegendOptions, Source } from '../../types';
import { LayerGroup } from '../../core/layer/layer-group';
import { getColorLegendItems } from './helper';

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
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<O> {
    return PointMap.DefaultOptions;
  }

  /**
   * 创建图层之前 hook
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected beforeCreateLayers(options: O) {
    const pointLayerConfig = { name: 'pointLayer' };

    return { pointLayerConfig };
  }

  /**
   * 创建图层
   */
  protected createLayers(source: Source): LayerGroup {
    const { pointLayerConfig } = this.beforeCreateLayers(this.options);
    this.pointLayerWrapper = new PointLayerWrapper({
      source,
      ...pick<any>(this.options, POINT_LAYER_OPTIONS_KEYS),
      ...pointLayerConfig,
    });
    const layerGroup = new LayerGroup([this.pointLayerWrapper.layer]);

    if (this.options.label) {
      this.labelLayerWrapper = this.createLabelLayer(source, this.options.label);
      layerGroup.addlayer(this.labelLayerWrapper.layer);
    }

    this.interactionLayers = [this.pointLayerWrapper.layer];

    return layerGroup;
  }

  /**
   * 更新图层
   */
  protected updateLayers(options: O) {
    const pointLayerConfig = pick<any>(options, POINT_LAYER_OPTIONS_KEYS);
    this.pointLayerWrapper.updateOptions(pointLayerConfig);

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

  /**
   * 实现 legend 配置项
   */
  protected getLegendOptions(): ILegendOptions {
    const colorLegendItems = this.pointLayer.getLegendItems('color');
    if (Array.isArray(colorLegendItems) && colorLegendItems.length !== 0) {
      const items = getColorLegendItems(colorLegendItems);
      return { category: { items } };
    }

    return {};
  }
}
