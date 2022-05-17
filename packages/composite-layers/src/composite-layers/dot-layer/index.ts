import { CompositeLayer } from '../../core/composite-layer';
import { PointLayer } from '../../core-layers/point-layer';
import { DotLayerOptions } from './types';
import { ICoreLayer, ISource, SourceOptions } from '../../types';
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
   * 主图层
   */
  protected get layer() {
    return this.fillLayer;
  }
  /**
   * 填充图层
   */
  public get fillLayer() {
    return this.subLayers.getLayer('fillLayer') as ICoreLayer;
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
    const pointLayer = new PointLayer({ name: 'fillLayer', ...this.getFillLayerOptions() });

    const subLayers = [pointLayer];

    return subLayers;
  }

  private getFillLayerOptions() {
    const { source, visible, minZoom, maxZoom, zIndex = 0, color, style, ...baseConfig } = this.options;

    // const fillState = {
    //   active: defaultState.active.fill === false ? false : { color: defaultState.active.fill },
    //   select: false,
    // };
    const fillStyle = { opacity: style?.opacity };

    const options = {
      ...baseConfig,
      visible,
      minZoom,
      maxZoom,
      zIndex,
      source,
      color,
      // state: fillState,
      style: fillStyle,
    };

    return options;
  }

  /**
   * 设置子图层数据
   */
  protected setSubLayersSource(source: SourceOptions | ISource) {
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

    this.initSubLayersEvent();
  }
}
