import { uniqueId } from '@antv/util';
import { LineLayer } from '@antv/l7';
import { PlotLayer } from '../../core/layer/plot-layer';
import { mappingLayer } from './adaptor';
import { LinesLayerOptions } from './types';
import { ILayer } from '../../types';
import { getColorLegendItems } from '../dot-layer/helper';

export type { LinesLayerOptions };

const DEFAULT_OPTIONS = {};
const LAYER_OPTIONS_KEYS = ['shape', 'color', 'size', 'style', 'state', 'animate'];

export class LinesLayer<O extends LinesLayerOptions = LinesLayerOptions> extends PlotLayer<O> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;
  /**
   * 图层配置项 Keys
   */
  static LayerOptionsKeys = PlotLayer.LayerConfigkeys.concat(LAYER_OPTIONS_KEYS);
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
  public type = PlotLayer.LayerType.LinesLayer;
  /**
   * 图层是否具有交互属性
   */
  public interaction = true;

  constructor(options: O) {
    super(options);
    const { name, source } = this.options;
    const config = this.pickLayerConfig(this.options);

    this.name = name ? name : uniqueId(this.type);
    this.layer = new LineLayer({ ...config, name: this.name });

    this.mappingLayer(this.layer, this.options);
    this.setSource(source);
  }

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<O> {
    return DEFAULT_OPTIONS;
  }

  protected mappingLayer(layer: ILayer, options: O) {
    mappingLayer(layer, options);
  }

  public update(options: Partial<O>) {
    super.update(options);

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
