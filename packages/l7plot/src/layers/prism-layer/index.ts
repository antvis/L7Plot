import { uniqueId } from '@antv/util';
import { PolygonLayer } from '@antv/l7-layers';
import { BaseLayer } from '../../core/layer/base-layer';
import { deepAssign } from '../../utils';
import { mappingLayer } from './adaptor';
import { IPrismLayerOptions } from './interface';
import { ILayer } from '../../types';
import { getColorLegendItems } from '../dot-layer/helper';

const DEFAULT_OPTIONS = {};
const LAYER_OPTIONS_KEYS = ['autoFit', 'color', 'size', 'style', 'state'];

export class PrismLayer extends BaseLayer<IPrismLayerOptions> {
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
  public options: IPrismLayerOptions;
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
  public type = 'prismLayer';
  /**
   * 图层是否具有交互属性
   */
  public interaction = true;

  constructor(options: IPrismLayerOptions) {
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
  public getDefaultOptions(): Partial<IPrismLayerOptions> {
    return DEFAULT_OPTIONS;
  }

  protected mappingLayer(layer: ILayer, options: IPrismLayerOptions) {
    mappingLayer(layer, options);
  }

  public updateOptions(options: Partial<IPrismLayerOptions>) {
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
