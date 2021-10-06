import { uniqueId } from '@antv/util';
import { LineLayer } from '@antv/l7-layers';
import { PlotLayer } from '../../core/layer/plot-layer';
import { deepAssign } from '../../utils';
import { mappingLayer } from './adaptor';
import { ILinesLayerOptions } from './interface';
import { ILayer } from '../../types';

export type { ILinesLayerOptions };

const DEFAULT_OPTIONS = {};
const LAYER_OPTIONS_KEYS = ['autoFit', 'shape', 'color', 'size', 'style', 'state', 'animate'];

export class LinesLayer<O extends ILinesLayerOptions = ILinesLayerOptions> extends PlotLayer<O> {
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
  public type = PlotLayer.LayerType.LinesLayer;
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
    this.layer = new LineLayer({ ...config, name: this.name });

    this.mappingLayer(this.layer, this.options);
    this.setSource(source);
  }

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<ILinesLayerOptions> {
    return DEFAULT_OPTIONS;
  }

  protected mappingLayer(layer: ILayer, options: O) {
    mappingLayer(layer, options);
  }

  public updateOptions(options: Partial<O>) {
    this.options = deepAssign({}, this.options, options);
    this.mappingLayer(this.layer, this.options);
  }
}
