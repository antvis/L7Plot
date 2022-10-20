import { Source } from '@antv/l7';
import EventEmitter from '@antv/event-emitter';
import { isEqual, isUndefined, uniqueId, omit } from '@antv/util';
import { deepMergeLayerOptions, isSourceChanged } from '../utils';
import {
  ICoreLayer,
  ILayer,
  LayerBlend,
  LayerBaseConfig,
  Scene,
  SourceOptions,
  ShapeAttr,
  ColorAttr,
  SizeAttr,
  ScaleAttr,
  AnimateAttr,
  StateAttribute,
  TextureAttr,
  ISource,
  ILegend,
} from '../types';
import { CoreLayerEvent, OriginLayerEventList } from './constants';
import { MappingAttribute } from '../adaptor/attribute';

/**
 * 核心图层的基础配置
 */
export interface CoreLayerOptions extends Partial<LayerBaseConfig> {
  /**
   * 图层 ID
   */
  id?: string;
  /**
   * 数据
   */
  source: SourceOptions | Source;
  /**
   * 图形形状
   */
  shape?: ShapeAttr<string>;
  /**
   * 图形颜色
   */
  color?: ColorAttr;
  /**
   * 图形大小
   */
  size?: SizeAttr;
  /**
   * 比例尺
   */
  scale?: ScaleAttr;
  /**
   * 纹理贴图
   */
  texture?: TextureAttr;
  /**
   * 图层样式
   */
  style?: Record<string, any>;
  /**
   * animation 配置
   */
  animate?: AnimateAttr;
  /**
   * 交互反馈
   */
  state?: StateAttribute;
}

export abstract class CoreLayer<O extends CoreLayerOptions> extends EventEmitter implements ICoreLayer {
  /**
   * 默认的 options 配置项
   */
  static DefaultOptions: Partial<CoreLayerOptions> = {};
  /**
   * 是否是复合图层
   */
  public readonly isComposite = false;
  /**
   * 图层名称
   */
  public readonly name: string;
  /**
   * 图层 ID
   */
  public readonly id: string;
  /**
   * 图层类型
   */
  public abstract readonly type: string;
  /**
   * 图层 schema 配置
   */
  public options: O;
  /**
   * 图层上一次的 schema 配置
   */
  public lastOptions: O;
  /**
   * Scene 实例
   */
  protected scene: Scene | undefined;
  /**
   * 图层实例
   */
  public readonly layer: ILayer;
  /**
   * 图层是否初始化成功
   */
  public get inited() {
    return this.layer.inited;
  }
  /**
   * 图层的 source 实例
   */
  public get source() {
    return this.layer.getSource();
  }

  constructor(options: O) {
    super();
    const { id, name, source } = options;
    this.id = id ? id : uniqueId('core-layer');
    this.name = name ? name : this.id;
    this.options = deepMergeLayerOptions<O>(this.getDefaultOptions() as O, options);
    this.lastOptions = this.options;
    this.layer = this.createLayer();

    this.adaptorLayerAttr();
    this.setSource(source);

    this.emit(CoreLayerEvent.CREATED);
  }

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<CoreLayerOptions> {
    return CoreLayer.DefaultOptions;
  }

  /**
   * 获取创建图层配置项
   */
  protected getLayerConfig(): Partial<LayerBaseConfig> {
    const config = omit<any>(this.options, [
      'source',
      'shape',
      'color',
      'size',
      'scale',
      'texture',
      'style',
      'animate',
      'state',
    ]);
    return config;
  }

  /**
   * 创建图层
   */
  protected abstract createLayer(): ILayer;

  /**
   * 适配属性配置
   */
  protected adaptorAttrOptions(options: O): CoreLayerOptions {
    return options;
  }

  /**
   * 映射图层属性
   */
  protected adaptorLayerAttr(): void {
    const { shape, color, size, scale, texture, style, animate, state } = this.adaptorAttrOptions(this.options);
    // mapping shape
    shape && MappingAttribute.shape(this.layer, shape);
    // mapping size
    size && MappingAttribute.size(this.layer, size);
    // mapping color
    color && MappingAttribute.color(this.layer, color);
    // mapping scale
    scale && MappingAttribute.scale(this.layer, scale);
    // mapping texture
    texture && MappingAttribute.texture(this.layer, texture);
    // mapping style
    style && MappingAttribute.style(this.layer, style);
    // mapping animate
    animate && MappingAttribute.animate(this.layer, animate);
    // mapping state
    state && MappingAttribute.state(this.layer, state);
  }

  /**
   * 设置图层数据
   * 支持 source 配置项与 source 实例更新
   */
  public setSource(source: SourceOptions | ISource) {
    if (source instanceof Source) {
      this.layer.setSource(source);
    } else {
      const { data, ...option } = source;
      const layerSource = this.layer.getSource();
      if (layerSource) {
        this.layer.setData(data, option);
      } else {
        this.layer.source(data, option);
      }
    }
  }

  /**
   * 添加到场景
   */
  public addTo(scene: Scene) {
    this.scene = scene;
    scene.addLayer(this.layer);
    this.emit(CoreLayerEvent.ADD);
  }

  /**
   * 从场景移除
   */
  public remove() {
    if (!this.scene) return;
    this.scene.removeLayer(this.layer);
    this.emit(CoreLayerEvent.REMOVE);
  }

  /**
   * 更新
   */
  public update(options: Partial<O>) {
    this.updateOption(options);
    this.updateConfig(options);

    // 停止渲染，避免属性更新与数据更新造成多次内部调用 scene render
    this.scene?.setEnableRender(false);

    if (isUndefined(this.options.visible) || this.options.visible) {
      this.adaptorLayerAttr();
    }

    if (options.source && isSourceChanged(options.source, this.lastOptions.source)) {
      this.changeData(options.source);
    }

    this.scene?.setEnableRender(true);
    this.render();
  }

  /**
   * 更新: 更新配置
   */
  public updateOption(options: Partial<O>) {
    this.lastOptions = this.options;
    this.options = deepMergeLayerOptions<O>(this.options, options);
  }

  // 更新: 更新图层属性配置
  public updateConfig(options: Partial<CoreLayerOptions>) {
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

  /**
   * 更新数据
   * 支持 source 配置项
   */
  public changeData(source: SourceOptions) {
    this.setSource(source);
  }

  /**
   * 设置图层 zIndex
   */
  public setIndex(zIndex: number) {
    this.layer.setIndex(zIndex);
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
    this.layer.setMinZoom(minZoom);
  }

  /**
   * 设置图层 maxZoom
   */
  public setMaxZoom(maxZoom: number) {
    this.layer.setMaxZoom(maxZoom);
  }

  /**
   * 显示图层
   */
  public show() {
    if (!this.layer.inited) return;
    this.layer.show();
  }

  /**
   * 隐藏图层
   */
  public hide() {
    if (!this.layer.inited) return;
    this.layer.hide();
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
    return this.layer.inited ? this.layer.isVisible() : this.options.visible || false;
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
   * 事件代理: 绑定事件
   */
  public on(name: string, callback: (...args: any[]) => void) {
    if (OriginLayerEventList.indexOf(name) !== -1) {
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

  /**
   * 摧毁
   */
  public destroy() {
    this.layer.destroy();
  }
}
