import { uniqueId } from '@antv/util';
import { HeatmapLayer as Heatmap } from '@antv/l7';
import { PlotLayer } from '../../core/layer/plot-layer';
import { mappingLayer } from './adaptor';
import { GridLayerOptions } from './types';
import { ILayer } from '../../types';

export type { GridLayerOptions };

const DEFAULT_OPTIONS: GridLayerOptions = {
  source: {
    data: [],
    parser: {
      type: 'json',
      x: 'x',
      y: 'y',
    },
    aggregation: {
      type: 'grid',
      field: '',
      radius: 15000,
      method: 'sum',
    },
  },
  shape: 'square',
  color: '#5FD3A6',
  style: {
    coverage: 0.9,
    angle: 0,
    opacity: 1.0,
  },
};
const LAYER_OPTIONS_KEYS = ['shape', 'color', 'size', 'style', 'state'];

export class GridLayer extends PlotLayer<GridLayerOptions> {
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
  public type = PlotLayer.LayerType.GridLayer;
  /**
   * 图层是否具有交互属性
   */
  public interaction = false;

  constructor(options: GridLayerOptions) {
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
  public getDefaultOptions(): Partial<GridLayerOptions> {
    return DEFAULT_OPTIONS;
  }

  protected mappingLayer(layer: ILayer, options: GridLayerOptions) {
    mappingLayer(layer, options);
  }

  public update(options: Partial<GridLayerOptions>) {
    super.update(options);

    this.mappingLayer(this.layer, this.options);
  }
}
