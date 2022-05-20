import { deepMix, uniqueId } from '@antv/util';
import EventEmitter from '@antv/event-emitter';
import Source from '@antv/l7-source';
import { Scene, SourceOptions, ICompositeLayer, CompositeLayerType, LayerBlend, ICoreLayer, ISource } from '../types';
import { LayerEventList } from './constants';
import { LayerGroup } from './layer-group';

/**
 * 复合图层的基础配置
 */
export interface CompositeLayerOptions {
  name?: string;
  id?: string;
  zIndex?: number;
  visible?: boolean;
  minZoom?: number;
  maxZoom?: number;
  pickingBuffer?: number;
  autoFit?: boolean;
  blend?: LayerBlend;
  source: any;
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
   * 图层是否具有交互效果，用于 tooltip
   */
  public abstract readonly interaction: boolean;
  /**
   * 子图层组
   */
  public subLayers: LayerGroup;

  constructor(options: O) {
    super();
    const { id, name } = options;
    this.id = id ? id : uniqueId('composite-layer');
    this.name = name ? name : this.id;
    this.options = deepMix({}, this.getDefaultOptions(), options);
    this.lastOptions = this.options;

    const layers = this.createSubLayers();
    this.subLayers = new LayerGroup(layers);
  }

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<CompositeLayerOptions> {
    return CompositeLayer.DefaultOptions;
  }

  /**
   * 创建 source 实例
   */
  protected createSource(sourceOptions: SourceOptions) {
    const { data, ...sourceCFG } = sourceOptions;
    const source = new Source(data, sourceCFG);
    return source;
  }

  /**
   * 创建子图层
   */
  protected abstract createSubLayers(): ICoreLayer[];

  /**
   * 设置子图层数据
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
    this.subLayers.addTo(scene);
  }

  /**
   * 从场景移除
   */
  public remove() {
    if (!this.scene) return;
    this.subLayers.remove();
  }

  /**
   * 更新
   */
  public update(options: Partial<O>) {
    this.updateOption(options);
    this.updateSubLayers(options);
  }

  /**
   * 更新: 更新配置
   */
  public updateOption(options: Partial<O>) {
    this.lastOptions = this.options;
    this.options = deepMix({}, this.options, options);
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

  public changeData(source: SourceOptions) {
    this.setSubLayersSource(source);
  }

  public setIndex(zIndex: number) {
    this.subLayers.setZIndex(zIndex);
  }

  public setBlend(blend: LayerBlend) {
    this.layer.setBlend(blend);
  }

  public setMinZoom(minZoom: number) {
    this.subLayers.getLayers().forEach((layer) => {
      layer.setMinZoom(minZoom);
    });
  }

  public setMaxZoom(maxZoom: number) {
    this.subLayers.getLayers().forEach((layer) => {
      layer.setMaxZoom(maxZoom);
    });
  }

  public show() {
    if (!this.layer.inited) return;
    this.subLayers.getLayers().forEach((layer) => {
      layer.show();
    });
  }

  public hide() {
    if (!this.layer.inited) return;
    this.subLayers.getLayers().forEach((layer) => {
      layer.hide();
    });
  }

  public toggleVisible() {
    this.isVisible() ? this.hide() : this.show();
  }

  public isVisible() {
    return this.layer.inited ? this.layer.isVisible() : this.options.visible;
  }

  public fitBounds(fitBoundsOptions?: unknown) {
    this.layer.fitBounds(fitBoundsOptions);
  }

  public getLegendItems(type: string): Record<string, any>[] {
    return this.layer.getLegendItems(type);
  }

  public getColorLegendItems(): Record<string, any>[] {
    const colorLegendItems = this.layer.getLegendItems('color');
    if (Array.isArray(colorLegendItems) && colorLegendItems.length !== 0) {
      const items = colorLegendItems;
      return items;
    }

    return [];
  }

  public destroy() {
    this.subLayers.destroy();
  }

  /**
   * 事件代理: 绑定事件
   */
  public on(name: string, callback: (...args: any[]) => void) {
    if (LayerEventList.indexOf(name) !== -1) {
      this.layer.on(name, callback);
    } else {
      super.on(name, callback);
    }
    return this;
  }

  /**
   * 事件代理: 绑定一次事件
   */
  public once(name: string, callback: (...args: any[]) => void) {
    if (LayerEventList.indexOf(name) !== -1) {
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
    if (LayerEventList.indexOf(name) !== -1) {
      this.layer.off(name, callback);
    } else {
      super.off(name, callback);
    }
    return this;
  }
}
