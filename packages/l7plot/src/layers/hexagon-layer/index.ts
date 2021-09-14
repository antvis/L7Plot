import { uniqueId } from '@antv/util';
import { HeatmapLayer as Heatmap } from '@antv/l7-layers';
import { BaseLayer } from '../../core/layer/base-layer';
import { deepAssign } from '../../utils';
import { mappingLayer } from './adaptor';
import { IHexagonLayerOptions } from './interface';
import { ILayer } from '../../types';

const DEFAULT_OPTIONS: IHexagonLayerOptions = {
  source: {
    data: [],
    parser: {
      type: 'json',
      x: 'x',
      y: 'y',
    },
    aggregation: {
      type: 'hexagon',
      field: '',
      radius: 15000,
      method: 'sum',
    },
  },
  shape: 'hexagon',
  color: '#5FD3A6',
  style: {
    coverage: 0.9,
    angle: 0,
    opacity: 1.0,
  },
};
const LAYER_OPTIONS_KEYS = ['autoFit', 'shape', 'color', 'size', 'style', 'state'];

export class HexagonLayer extends BaseLayer<IHexagonLayerOptions> {
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
  public options: IHexagonLayerOptions;
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
  public type = 'hexagonLayer';
  /**
   * 图层是否具有交互属性
   */
  public interaction = false;

  constructor(options: IHexagonLayerOptions) {
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
  public getDefaultOptions(): Partial<IHexagonLayerOptions> {
    return DEFAULT_OPTIONS;
  }

  protected mappingLayer(layer: ILayer, options: IHexagonLayerOptions) {
    mappingLayer(layer, options);
  }

  public updateOptions(options: Partial<IHexagonLayerOptions>) {
    this.options = deepAssign({}, this.options, options);
    this.mappingLayer(this.layer, this.options);
  }
}
