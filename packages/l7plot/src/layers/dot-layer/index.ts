import { uniqueId } from '@antv/util';
import { PointLayer } from '@antv/l7-layers';
import { BaseLayer } from '../../core/layer/base-layer';
import { deepAssign } from '../../utils';
import { mappingLayer } from './adaptor';
import { IDotLayerOptions } from './interface';
import { ILayer } from '../../types';
import { getColorLegendItems } from './helper';

const DEFAULT_OPTIONS = {
  source: {
    data: [],
    parser: {
      type: 'json',
      x: 'x',
      y: 'y',
    },
  },
  shape: 'circle',
  size: 12,
  color: '#5FD3A6',
};
const LAYER_OPTIONS_KEYS = ['autoFit', 'shape', 'color', 'size', 'style', 'state', 'animate'];

export class DotLayer<O extends IDotLayerOptions = IDotLayerOptions> extends BaseLayer<O> {
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
  public options: O;
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
  public type = 'dotLayer';
  /**
   * 图层是否具有交互属性
   */
  public interaction = true;

  constructor(options: O) {
    super();
    const { name, source } = options;
    this.name = name ? name : uniqueId(this.type);
    this.options = deepAssign({}, this.getDefaultOptions(), options);

    const config = this.pickLayerConfig(this.options);
    this.layer = new PointLayer({ ...config, name: this.name });

    this.mappingLayer(this.layer, this.options);
    this.setSource(source);
  }

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<IDotLayerOptions> {
    return DEFAULT_OPTIONS;
  }

  protected mappingLayer(layer: ILayer, options: O) {
    mappingLayer(layer, options);
  }

  public updateOptions(options: Partial<O>) {
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
