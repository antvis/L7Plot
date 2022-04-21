import { PointLayer } from '@antv/l7-layers';
import { CompositeLayer } from '../../core/composite-layer';
import { mappingLayersAttr } from './adaptor';
import { DotLayerOptions } from './types';
import { ILayer, Source, SourceOptions } from '../../types';
import { DEFAULT_OPTIONS } from './constants';

export type { DotLayerOptions };

export class DotLayer<O extends DotLayerOptions = DotLayerOptions> extends CompositeLayer<O> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;
  /**
   * 复合图层类型
   */
  public type = CompositeLayer.LayerType.DotLayer;
  /**
   * 主图层 点图层实例
   */
  public get layer() {
    return this.subLayers.getLayer('pointLayer') as ILayer;
  }
  /**
   * 图层是否具有交互属性
   */
  public interaction = true;

  constructor(options: O) {
    super(options);
    this.initSubLayersEvent();
  }

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<O> {
    return DotLayer.DefaultOptions as O;
  }

  /**
   * 创建子图层
   */
  protected createSubLayers() {
    // const { state } = this.options;
    const baseConfig = this.pickLayerBaseConfig();
    // const { visible, minZoom, maxZoom, zIndex = 0 } = baseConfig;

    const pointLayer = new PointLayer({ ...baseConfig, name: 'pointLayer' });

    const subLayers = [pointLayer];

    return subLayers;
  }

  /**
   * 映射子图层属性
   */
  protected adaptorSubLayersAttr() {
    mappingLayersAttr(this.layer, this.options);
  }

  /**
   * 设置子图层数据
   */
  protected setSubLayersSource(source: SourceOptions | Source) {
    super.setSubLayersSource(source);
  }

  /**
   * 初始化子图层事件
   */
  protected initSubLayersEvent() {
    //
  }

  public update(options: Partial<O>) {
    super.update(options);

    this.adaptorSubLayersAttr();

    this.initSubLayersEvent();
  }
}
