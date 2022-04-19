import { isEqual, isUndefined, pick, deepMix } from '@antv/util';
import Source from '@antv/l7-source';
import EventEmitter from '@antv/event-emitter';
import {
  Scene,
  ILayer,
  ILayerConfig,
  SourceOptions,
  CompositeLayerOptions,
  ICompositeLayer,
  LayerType,
  LayerBlend,
} from '../types';
import { MappingSource } from '../adaptor/source';
import { LayerEventList } from './constants';

const LayerConfigkeys = ['name', 'zIndex', 'visible', 'minZoom', 'maxZoom', 'pickingBuffer', 'autoFit', 'blend'];

export abstract class CompositeLayer<O extends CompositeLayerOptions> extends EventEmitter implements ICompositeLayer {
  /**
   * 地图图表类型
   */
  static LayerType = LayerType;
  /**
   * 图层属性配置项 Keys
   */
  static LayerConfigkeys = LayerConfigkeys;
  /**
   * layer 的 schema 配置
   */
  public options: O;
  /**
   * layer 上一次的 schema 配置
   */
  public lastOptions: O;
  /**
   * Scene 实例
   */
  protected scene: Scene | undefined;
  /**
   * layer 实例
   */
  public abstract readonly layer: ILayer;
  /**
   * layer 名称
   */
  public abstract readonly name: string;
  /**
   * layer 类型
   */
  public abstract readonly type: LayerType | string;
  /**
   * layer 是否具有交互效果，用于 tooltip
   */
  public abstract readonly interaction: boolean;

  constructor(options: O) {
    super();
    this.options = deepMix({}, this.getDefaultOptions(), options);
    this.lastOptions = this.options;
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<O> {
    return {};
  }

  public pickLayerConfig<T extends CompositeLayerOptions>(params: T): Partial<ILayerConfig> {
    const config = pick<any>(params, LayerConfigkeys);
    return config;
  }

  public addTo(scene: Scene) {
    this.scene = scene;
    scene.addLayer(this.layer);
  }

  public remove() {
    if (!this.scene) return;
    this.scene.removeLayer(this.layer);
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
    this.layer.renderLayers();
  }

  protected setSource(source: SourceOptions | Source) {
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

  public changeData(source: SourceOptions | Source) {
    this.setSource(source);
  }

  public setIndex(zIndex: number) {
    this.layer.setIndex(zIndex);
  }

  public setBlend(blend: LayerBlend) {
    this.layer.setBlend(blend);
  }

  public setMinZoom(minZoom: number) {
    this.layer.setMinZoom(minZoom);
  }

  public setMaxZoom(maxZoom: number) {
    this.layer.setMaxZoom(maxZoom);
  }

  public show() {
    this.layer.inited && this.layer.show();
  }

  public hide() {
    this.layer.inited && this.layer.hide();
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
    this.layer.destroy();
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
