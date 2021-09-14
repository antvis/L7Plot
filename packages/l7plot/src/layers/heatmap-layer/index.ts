import { uniqueId } from '@antv/util';
import { HeatmapLayer as Heatmap } from '@antv/l7-layers';
import { BaseLayer } from '../../core/layer/base-layer';
import { deepAssign } from '../../utils';
import { mappingLayer } from './adaptor';
import { IHeatmapLayerOptions } from './interface';
import { ILayer } from '../../types';

const DEFAULT_OPTIONS: IHeatmapLayerOptions = {
  source: {
    data: [],
    parser: {
      type: 'json',
      x: 'x',
      y: 'y',
    },
  },
  shape: 'heatmap',
  size: {
    value: [0, 1],
  },
  style: {
    intensity: 3,
    radius: 20,
    opacity: 1,
    colorsRamp: [
      { color: 'rgba(33,102,172,0.0)', position: 0 },
      { color: 'rgb(103,169,207)', position: 0.2 },
      { color: 'rgb(209,229,240)', position: 0.4 },
      { color: 'rgb(253,219,199)', position: 0.6 },
      { color: 'rgb(239,138,98)', position: 0.8 },
      { color: 'rgb(178,24,43,1.0)', position: 1 },
    ],
  },
};
const LAYER_OPTIONS_KEYS = ['autoFit', 'shape', 'color', 'size', 'style', 'state'];

export class HeatmapLayer extends BaseLayer<IHeatmapLayerOptions> {
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
  public options: IHeatmapLayerOptions;
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
  public type = 'heatmapLayer';
  /**
   * 图层是否具有交互属性
   */
  public interaction = false;

  constructor(options: IHeatmapLayerOptions) {
    super();
    const { name, source } = options;
    this.name = name ? name : uniqueId(this.type);
    this.options = deepAssign({}, this.getDefaultOptions(), options);

    const config = this.pickLayerConfig(this.options);
    this.layer = new Heatmap({ ...config, name: this.name });

    this.mappingLayer(this.layer, this.options);
    this.setSource(source);
  }

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<IHeatmapLayerOptions> {
    return DEFAULT_OPTIONS;
  }

  protected mappingLayer(layer: ILayer, options: IHeatmapLayerOptions) {
    mappingLayer(layer, options);
  }

  public updateOptions(options: Partial<IHeatmapLayerOptions>) {
    this.options = deepAssign({}, this.options, options);
    this.mappingLayer(this.layer, this.options);
  }
}
