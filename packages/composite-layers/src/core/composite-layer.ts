import { isEqual, isUndefined, pick, deepMix, uniqueId } from '@antv/util';
import Source from '@antv/l7-source';
import EventEmitter from '@antv/event-emitter';
import { Scene, ILayer, ILayerConfig, SourceOptions, ICompositeLayer, LayerType, LayerBlend } from '../types';
import { MappingSource } from '../adaptor/source';
import { LayerEventList } from './constants';
import { LayerGroup } from './layer-group';

const LayerBaseConfigkeys = ['name', 'zIndex', 'visible', 'minZoom', 'maxZoom', 'pickingBuffer', 'autoFit', 'blend'];

/**
 * 复合图层的基础配置
 */
export interface CompositeLayerOptions {
  name?: string;
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
  static LayerType = LayerType;
  /**
   * 默认的 options 配置项
   */
  static DefaultOptions: Partial<CompositeLayerOptions> = {};
  /**
   * 复合图层名称
   */
  public readonly name: string;
  /**
   * 复合图层类型
   */
  public abstract readonly type: LayerType | string;
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
  public abstract readonly layer: ILayer;
  /**
   * 图层是否具有交互效果，用于 tooltip
   */
  public abstract readonly interaction: boolean;
  /**
   * 子图层组
   */
  protected subLayers: LayerGroup;

  constructor(options: O) {
    super();
    const { name, source } = options;
    this.name = name ? name : uniqueId('composite-layer');
    this.options = deepMix({}, this.getDefaultOptions(), options);
    this.lastOptions = this.options;

    const subLayers = this.createSubLayers();
    this.subLayers = new LayerGroup(subLayers);
    this.adaptorSubLayersAttr();

    this.setSubLayersSource(source);
    // this.initEvent();
  }

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<CompositeLayerOptions> {
    return CompositeLayer.DefaultOptions;
  }

  /**
   * 获取子主图层基础配置项
   */
  protected pickLayerBaseConfig(): Partial<ILayerConfig> {
    const config = pick<any>(this.options, LayerBaseConfigkeys);
    return config;
  }

  /**
   * 创建子图层
   */
  protected abstract createSubLayers(): ILayer[];

  /**
   * 映射子图层属性
   */
  protected abstract adaptorSubLayersAttr(): void;

  /**
   * 设置子图层数据
   */
  protected setSubLayersSource(source: SourceOptions | Source) {
    if (source instanceof Source) {
      this.layer.setSource(source);
    } else {
      const { data, aggregation, ...option } = source;
      aggregation && MappingSource.aggregation(option, aggregation);
      const layerSource = this.layer.getSource();
      if (layerSource) {
        this.layer.setData(data, option);
      } else {
        this.layer.source(data, option);
      }
    }
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
    this.updateConfig(options);
  }

  /**
   * 更新: 更新配置
   */
  public updateOption(options: Partial<O>) {
    this.lastOptions = this.options;
    this.options = deepMix({}, this.options, options);
  }

  // 更新: 更新图层属性配置
  public updateConfig(options: Partial<CompositeLayerOptions>) {
    if (!isUndefined(options.zIndex) && !isEqual(this.lastOptions.zIndex, this.options.zIndex)) {
      this.setIndex(options.zIndex);
    }

    if (!isUndefined(options.blend) && !isEqual(this.lastOptions.blend, this.options.blend)) {
      this.setBlend(options.blend);
    }

    if (!isUndefined(options.minZoom) && !isEqual(this.lastOptions.minZoom, this.options.minZoom)) {
      this.setMinZoom(options.minZoom);
    }

    if (!isUndefined(options.maxZoom) && !isEqual(this.lastOptions.maxZoom, this.options.maxZoom)) {
      this.setMinZoom(options.maxZoom);
    }

    if (!isUndefined(options.visible) && !isEqual(this.lastOptions.visible, this.options.visible)) {
      options.visible ? this.show() : this.hide();
    }
  }

  public render() {
    if (this.scene) {
      this.scene.render();
    }
  }

  public changeData(source: SourceOptions | Source) {
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

  public getlegenditems(type: string): Record<string, any>[] {
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
