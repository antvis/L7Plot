import { uniqueId } from '@antv/util';
import { PolygonLayer } from '@antv/l7-layers';
import { PlotLayer } from '../../core/layer/plot-layer';
import { deepAssign } from '../../utils';
import { mappingLayer } from './adaptor';
import { PrismLayerOptions } from './types';
import { ILayer } from '../../types';
import { getColorLegendItems } from '../dot-layer/helper';

export type { PrismLayerOptions };

const DEFAULT_OPTIONS = {};
const LAYER_OPTIONS_KEYS = ['autoFit', 'color', 'size', 'style', 'state'];

export class PrismLayer extends PlotLayer<PrismLayerOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;
  /**
   * 图层配置项 Keys
   */
  static LayerOptionsKeys = LAYER_OPTIONS_KEYS;
  /**
   * 图层配置项
   */
  public options: PrismLayerOptions;
  /**
   * 图层名称
   */
  public name: string;
  /**
   * 图层实例
   */
  public layer: ILayer;
  /**
   * 图层类型
   */
  public type = PlotLayer.LayerType.PrismLayer;
  /**
   * 图层是否具有交互属性
   */
  public interaction = true;

  constructor(options: PrismLayerOptions) {
    super();
    const { name, source } = options;
    this.name = name ? name : uniqueId(this.type);
    this.options = deepAssign({}, this.getDefaultOptions(), options);

    const config = this.pickLayerConfig(this.options);
    this.layer = new PolygonLayer({ ...config, name: this.name });

    this.mappingLayer(this.layer, this.options);
    this.setSource(source);
  }

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<PrismLayerOptions> {
    return DEFAULT_OPTIONS;
  }

  protected mappingLayer(layer: ILayer, options: PrismLayerOptions) {
    mappingLayer(layer, options);
  }

  public updateOptions(options: Partial<PrismLayerOptions>) {
    this.options = deepAssign({}, this.options, options);
    this.mappingLayer(this.layer, this.options);
  }

  public getColorLegendItems() {
    const colorLegendItems = this.layer.getLegendItems('color');
    if (Array.isArray(colorLegendItems) && colorLegendItems.length !== 0) {
      const items = getColorLegendItems(colorLegendItems);
      return items;
    }

    return [];
  }
}
