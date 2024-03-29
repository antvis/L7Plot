import { uniqueId } from '@antv/util';
import { HeatmapLayer as Heatmap } from '@antv/l7';
import { PlotLayer } from '../../core/layer/plot-layer';
import { mappingLayer } from './adaptor';
import { HexbinLayerOptions } from './types';
import { ILayer } from '../../types';

export type { HexbinLayerOptions };

const DEFAULT_OPTIONS: HexbinLayerOptions = {
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
const LAYER_OPTIONS_KEYS = ['shape', 'color', 'size', 'style', 'state'];

export class HexbinLayer extends PlotLayer<HexbinLayerOptions> {
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
  public type = PlotLayer.LayerType.HexbinLayer;
  /**
   * 图层是否具有交互属性
   */
  public interaction = false;

  constructor(options: HexbinLayerOptions) {
    super(options);
    const { name, source } = this.options;
    const config = this.pickLayerConfig(this.options);

    this.name = name ? name : uniqueId(this.type);
    this.layer = new Heatmap({ ...config, name: this.name });

    this.mappingLayer(this.layer, this.options);
    this.setSource(source);
  }

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<HexbinLayerOptions> {
    return DEFAULT_OPTIONS;
  }

  protected mappingLayer(layer: ILayer, options: HexbinLayerOptions) {
    mappingLayer(layer, options);
  }

  public update(options: Partial<HexbinLayerOptions>) {
    super.update(options);

    this.mappingLayer(this.layer, this.options);
  }
}
