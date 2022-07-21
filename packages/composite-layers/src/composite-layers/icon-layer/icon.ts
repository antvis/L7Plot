import { CompositeLayer } from '../../core/composite-layer';
import { TextLayer } from '../../core-layers/text-layer';
import { PointLayer } from '../../core-layers/point-layer';
import { IconLayerOptions } from './types';
import { getDefaultState } from './adaptor';
import { DEFAULT_OPTIONS, DEFAULT_STATE } from './constants';
import { ICoreLayer } from '../../types';
import { getLabelLayerOptions } from '../common/label-layer';

export abstract class IconLayer<T extends IconLayerOptions> extends CompositeLayer<T> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;
  /**
   * 图层交互状态配置
   */
  protected layerState = DEFAULT_STATE;
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
  /**
   * 图层是否具有交互属性
   */
  public interaction = true;

  constructor(options: T) {
    super(options);
    // this.initSubLayersEvent();
  }

  /**
   * 创建子图层
   */
  protected abstract initAssets(): void;

  /**
   * 获取填充图层配置项
   */
  private getFillLayerOptions() {
    const {
      visible,
      minZoom,
      maxZoom,
      zIndex = 0,
      radius,
      opacity,
      icon,
      color,
      iconStyle,
      ...baseConfig
    } = this.options;
    const defaultState = this.layerState;

    const fillState = {
      active: false,
      select: false,
    };
    const fillStyle = {
      opacity: opacity,
      ...iconStyle,
    };

    const options = {
      ...baseConfig,
      visible,
      minZoom,
      maxZoom,
      zIndex,
      shape: icon,
      size: radius,
      state: fillState,
      color,
      style: fillStyle,
    };

    return options;
  }

  protected createSubLayers(): ICoreLayer[] {
    const source = this.source;
    this.initAssets();
    this.layerState = getDefaultState(this.options.state);
    console.log(this.getFillLayerOptions());
    // 映射填充图层
    const fillLayer = new PointLayer({
      ...this.getFillLayerOptions(),
      id: 'fillLayer',
      source,
    });
    const labelLayer = new TextLayer({
      ...getLabelLayerOptions<T>(this.options),
      id: 'labelLayer',
      source,
    });
    const subLayers = [fillLayer, labelLayer];

    return subLayers;
  }

  protected updateSubLayers(options: T) {
    this.iconLayer.update(this.getFillLayerOptions());
    this.labelLayer.update(getLabelLayerOptions<T>(this.options));
  }
}
