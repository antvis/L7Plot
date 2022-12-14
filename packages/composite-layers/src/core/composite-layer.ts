import { isUndefined, uniqueId } from '@antv/util';
import EventEmitter from '@antv/event-emitter';
import { ILegend, Source } from '@antv/l7';
import { deepMergeLayerOptions, isSourceChanged } from '../utils';
import { Scene, SourceOptions, ICompositeLayer, CompositeLayerType, LayerBlend, ICoreLayer, ISource } from '../types';
import { CompositeLayerEvent, LayerGroupEvent, OriginLayerEventList } from './constants';
import { LayerGroup } from './layer-group';

/**
 * 复合图层的基础配置
 */
export interface CompositeLayerOptions {
  /** 图层名称 */
  name?: string;
  /** 图层 ID */
  id?: string;
  /** 图层 zIndex */
  zIndex?: number;
  /**
   * 图层是否可见
   * @default true
   */
  visible?: boolean;
  /** 图层最小可见层级 */
  minZoom?: number;
  /** 图层最大可见层级 */
  maxZoom?: number;
  /**
   * 图层拾取缓存配置，
   * 如 1px 宽度的线鼠标很难拾取到, 通过设置该参数可扩大拾取的范围
   * @default 0
   * */
  pickingBuffer?: number;
  /**
   * 图层加载成功后是否自动定位到图层数据可见范围，注意开启后图层数据发生更新时，地图也会自动缩放到图层的数据边界范围
   * @default false
   */
  autoFit?: boolean;
  /**
   * 图层元素混合效果
   * @default 'normal'
   * */
  blend?: LayerBlend;
  /** 数据配置 */
  source: {
    /** 数据 */
    data: any;
  };
}

export abstract class CompositeLayer<O extends CompositeLayerOptions> extends EventEmitter implements ICompositeLayer {
  /**
   * 复合图层类型
   */
  static LayerType = CompositeLayerType;
  /**
   * 默认的 options 配置项
   */
  static DefaultOptions: Partial<CompositeLayerOptions> = {};
  /**
   * 是否是复合图层
   */
  public readonly isComposite = true;
  /**
   * 复合图层名称
   */
  public readonly name: string;
  /**
   * 图层 ID
   */
  public readonly id: string;
  /**
   * 复合图层类型
   */
  public abstract readonly type: CompositeLayerType | string;
  /**
   * 复合图层的 schema 配置
   */
  public options: O;
  /**
   * 复合图层上一次的 schema 配置
   */
  public lastOptions: O;
  /**
   * Scene 实例
   */
  protected scene: Scene | undefined;
  /**
   * 主子图层实例
   */
  protected abstract readonly layer: ICoreLayer;
  /**
   * 图层间共享 source 实例
   */
  public source!: ISource;
  /**
   * 子图层组
   */
  public subLayers: LayerGroup;

  constructor(options: O) {
    super();
    const { id, name } = options;
    this.id = id ? id : uniqueId('composite-layer');
    this.name = name ? name : this.id;
    this.options = deepMergeLayerOptions<O>(this.getDefaultOptions() as O, options);
    this.lastOptions = this.options;
    this.source = this.createSource();
    const layers = this.createSubLayers();
    this.subLayers = new LayerGroup(layers);

    this.emit(CompositeLayerEvent.CREATED, this);
  }

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<CompositeLayerOptions> {
    return CompositeLayer.DefaultOptions;
  }

  /**
   * 创建图层间共享 source 方法
   */
  protected createSource() {
    const sourceOptions = this.options.source;

    const { data, ...sourceCFG } = sourceOptions;
    const source = this.isSourceInstance(sourceOptions) ? sourceOptions : new Source(data, sourceCFG);
    return source;
  }

  /**
   * 判断 source 是否是实例工具方法
   */
  protected isSourceInstance(source: SourceOptions | ISource): source is ISource {
    if (source instanceof Source) {
      return true;
    }
    return false;
  }

  /**
   * 创建子图层
   */
  protected abstract createSubLayers(): ICoreLayer[];

  /**
   * 设置子图层数据
   *支持 source 配置项与 source 实例更新
   */
  protected setSubLayersSource(source: SourceOptions | ISource) {
    this.layer.changeData(source);
  }

  /**
   * 初始化子图层相关事件绑定
   */
  protected initSubLayersEvent(): void {
    //
  }

  /**
   * 添加到场景
   */
  public addTo(scene: Scene) {
    this.scene = scene;
    this.subLayers.once(LayerGroupEvent.INITED_LAYERS, () => {
      this.emit(CompositeLayerEvent.INITED, this);
      this.emit(CompositeLayerEvent.ADD, this);
    });
    this.subLayers.addTo(scene);
  }

  /**
   * 从场景移除
   */
  public remove() {
    if (!this.scene) return;
    this.subLayers.remove();
    this.emit(CompositeLayerEvent.REMOVE);
  }

  /**
   * 更新
   */
  public update(options: Partial<O>, autoRender = true) {
    this.updateOption(options);

    // 停止渲染，避免属性更新与数据更新造成多次内部调用 scene render => renderLayers
    if (autoRender) {
      this.scene?.setEnableRender(false);
    }

    // 数据更新
    if (options.source && isSourceChanged(options.source, this.lastOptions.source)) {
      this.changeData(options.source);
    }

    // 图层更新
    this.updateSubLayers(options);

    if (autoRender) {
      this.scene?.setEnableRender(true);
      this.render();
    }
  }

  /**
   * 更新: 更新配置
   */
  public updateOption(options: Partial<O>) {
    this.lastOptions = this.options;

    this.options = deepMergeLayerOptions<O>(this.options, options);
  }

  /**
   * 更新子图层
   */
  protected abstract updateSubLayers(options: Partial<O>): void;

  public render() {
    if (this.scene) {
      this.scene.render();
    }
  }

  /**
   * 更新数据
   */
  public changeData(source: SourceOptions) {
    this.setSubLayersSource(source);
  }

  /**
   * 设置图层 zIndex
   */
  public setIndex(zIndex: number) {
    this.subLayers.setZIndex(zIndex);
  }

  /**
   * 设置图层 blend
   */
  public setBlend(blend: LayerBlend) {
    this.layer.setBlend(blend);
  }

  /**
   * 设置图层 minZoom
   */
  public setMinZoom(minZoom: number) {
    this.subLayers.getLayers().forEach((layer) => {
      layer.setMinZoom(minZoom);
    });
  }

  /**
   * 设置图层 maxZoom
   */
  public setMaxZoom(maxZoom: number) {
    this.subLayers.getLayers().forEach((layer) => {
      layer.setMaxZoom(maxZoom);
    });
  }

  /**
   * 显示图层
   */
  public show() {
    if (!this.layer.inited) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.update({ visible: true });
  }

  /**
   * 隐藏图层
   */
  public hide() {
    if (!this.layer.inited) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.update({ visible: false });
  }

  /**
   * 切换图层显隐状态
   */
  public toggleVisible() {
    this.isVisible() ? this.hide() : this.show();
  }

  /**
   * 图层是否可见
   */
  public isVisible() {
    return this.layer.inited ? this.layer.isVisible() : isUndefined(this.options.visible) ? true : this.options.visible;
  }

  /**
   * 图层框选数据
   */
  public boxSelect(bounds: [number, number, number, number], callback: (...args: any[]) => void) {
    this.layer.boxSelect(bounds, callback);
  }

  /**
   * 定位到当前图层数据范围
   */
  public fitBounds(fitBoundsOptions?: unknown) {
    this.layer.fitBounds(fitBoundsOptions);
  }

  /**
   * 获取图例
   */
  public getLegend(name: string): ILegend {
    return this.layer.getLegend(name);
  }

  /**
   * 获取图例数据
   */
  public getLegendItems(type: string): Record<string, any>[] {
    return this.layer.getLegendItems(type);
  }

  /**
   * 获取颜色图例数据
   */
  public getColorLegendItems(): Record<string, any>[] {
    const colorLegendItems = this.layer.getLegendItems('color');
    if (Array.isArray(colorLegendItems) && colorLegendItems.length !== 0) {
      const items = colorLegendItems;
      return items;
    }

    return [];
  }

  /**
   * 获取带有交互的子图层
   * 一般用于是否启用 tooltip，图层事件绑定
   */
  public getInteractionSubLayers(): ICoreLayer[] {
    const layers = this.subLayers.getLayers().filter((layer) => layer.interaction === true);

    return layers;
  }

  /**
   * 摧毁
   */
  public destroy() {
    this.subLayers.destroy();
  }

  /**
   * 事件代理: 绑定事件
   */
  public on(name: string, callback: (...args: any[]) => void, once?: boolean) {
    if (OriginLayerEventList.indexOf(name) !== -1) {
      this.layer.on(name, callback);
    } else {
      super.on(name, callback, once);
    }
    return this;
  }

  /**
   * 事件代理: 绑定一次事件
   */
  public once(name: string, callback: (...args: any[]) => void) {
    if (OriginLayerEventList.indexOf(name) !== -1) {
      this.layer.once(name, callback);
    } else {
      super.once(name, callback);
    }
    return this;
  }

  /**
   * 事件代理: 解绑事件
   */
  public off(name: string, callback: (...args: any[]) => void) {
    if (OriginLayerEventList.indexOf(name) !== -1) {
      this.layer.off(name, callback);
    } else {
      super.off(name, callback);
    }
    return this;
  }
}
