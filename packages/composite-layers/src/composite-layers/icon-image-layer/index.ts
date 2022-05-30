import { CompositeLayer } from '../../core/composite-layer';
import { TextLayer } from '../../core-layers/text-layer';
import { IconLayerOptions } from './types';
import { DEFAULT_OPTIONS, DEFAULT_STATE, EMPTY_SOURCE } from './constants';
import { ICoreLayer, ISource, MouseEvent } from '../../types';
export class IconLayer extends CompositeLayer<IconLayerOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;
  /**
   * 图层交互状态配置
   */
  private layerState = DEFAULT_STATE;
  /**
   * 复合图层类型
   */
  public type = CompositeLayer.LayerType.IconImageLayer;

  /**
   * 主图层
   */
  protected get layer() {
    return this.iconLayer;
  }
  /**
   * 图层间共享 source 实例
   */
  public source!: ISource;
  /**
   * 填充面图层
   */
  protected get iconLayer() {
    return this.subLayers.getLayer('iconLayer') as ICoreLayer;
  }
  /**
   * 标注文本图层
   */
  public get labelLayer() {
    return this.subLayers.getLayer('labelLayer') as TextLayer;
  }

  constructor(options: IconLayerOptions) {
    super(options);
    this.initSubLayersEvent();
  }

  /**
   * 图层是否具有交互属性
   */
  public interaction = true;

  protected createSubLayers(): ICoreLayer[] {
    throw new Error('Method not implemented.');
  }
  protected updateSubLayers(options: IconLayerOptions): void {
    throw new Error('Method not implemented.');
  }
}
