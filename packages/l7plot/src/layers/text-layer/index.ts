import { uniqueId, isBoolean } from '@antv/util';
import { PointLayer } from '@antv/l7-layers';
import { PlotLayer } from '../../core/layer/plot-layer';
import { TextLayerConfig } from '../../types/layer';
import { deepAssign } from '../../utils';
import { mappingLayer } from './adaptor';
import { TextLayerOptions } from './types';
import { ILayer } from '../../types';

export type { TextLayerOptions };

const DEFAULT_OPTIONS = {
  style: {
    fontSize: 12,
  },
};

export class TextLayer extends PlotLayer<TextLayerOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;
  /**
   * 图层配置项
   */
  public options: TextLayerOptions;
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
  public type = PlotLayer.LayerType.TextLayer;
  /**
   * 图层是否具有交互属性
   */
  public interaction = false;

  constructor(options: TextLayerOptions) {
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
  public getDefaultOptions(): Partial<TextLayerOptions> {
    return DEFAULT_OPTIONS;
  }

  protected mappingLayer(layer: ILayer, options: TextLayerOptions) {
    mappingLayer(layer, options);
  }

  public updateOptions(options: Partial<TextLayerConfig>) {
    this.options = deepAssign({}, this.options, options);
    this.mappingLayer(this.layer, this.options);

    if (isBoolean(options.visible)) {
      options.visible ? this.show() : this.hide();
    }
  }
}
