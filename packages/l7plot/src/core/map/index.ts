import { Scene } from '@antv/l7-scene';
import { Mapbox, GaodeMap } from '@antv/l7-maps';
import { Scale, Layers, Zoom } from '@antv/l7-component';
import EventEmitter from '@antv/event-emitter';
import { isBoolean } from '@antv/util';
import { Tooltip } from '../../component/tooltip';
import { Legend } from '../../component/legend';
import { deepAssign } from '../../utils';
import {
  MapType,
  BaseMapType,
  IMapOptions,
  AMapInstance,
  MapboxInstance,
  Source,
  IZoomControlOptions,
  ILayerMenuControlOptions,
  IScaleControlOptions,
  ILegendOptions,
  IEvent,
  ILabelOptions,
  ILayer,
  ISourceCFG,
} from '../../types';
import { LayerGroup } from '../layer/layer-group';
import { LayerEventList, MapEventList, SceneEventList } from './constants';
import { FONT_FACE_CACHE, ICON_FONT_CACHE, IMAGES_CACHE } from './register';
import { LabelLayerWrapper } from '../../layers/label-layer';

const DEFAULT_OPTIONS = {
  map: { type: BaseMapType.Amap, style: 'dark' },
  logo: true,
  autoFit: true,
};

export abstract class MapWrapper<O extends IMapOptions> {
  /**
   * 默认的 options 配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;
  /**
   * 地图类型
   */
  static MapType = MapType;

  /**
   * 自定义事件中心
   */
  private readonly eventEmitter = new EventEmitter();
  /**
   * map 类型名称
   */
  public abstract readonly type: MapType | string;
  /**
   * 是否首次渲染
   */
  public inited = false;
  /**
   * 是否场景加载完成
   */
  public sceneLoaded = false;
  /**
   * 是否所有图层加载完成
   */
  public layersLoaded = false;
  /**
   * map 的 schema 配置
   */
  public options: O;
  /**
   * map 绘制的 dom
   */
  public readonly container: HTMLDivElement;
  /**
   * scene 实例
   */
  public scene: Scene;
  /**
   * 数据
   */
  public source: Source;
  /**
   * 图层组
   */
  public layerGroup = new LayerGroup();
  /**
   * 带交互的图层
   */
  protected abstract interactionLayers: ILayer[];
  /**
   * zoom 放缩器 Control
   */
  public zoomControl: Zoom | undefined;
  /**
   * scale 比例尺 Control
   */
  public scaleControl: Scale | undefined;
  /**
   * layerMenu 图层列表 Control
   */
  public layerMenuControl: Layers | undefined;
  /**
   * legend 图例 Control
   */
  public legendControl: Legend | undefined;
  /**
   * tooltip 悬浮提示
   */
  public tooltip: Tooltip | undefined;

  constructor(container: string | HTMLDivElement, options: O) {
    this.options = deepAssign({}, this.getDefaultOptions(), options);
    this.container = this.createContainer(container);

    this.scene = this.createScene();
    this.source = this.createSource();

    this.registerResources();
    this.render();
    this.inited = true;
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<IMapOptions> {
    return MapWrapper.DefaultOptions;
  }

  /**
   * 创建 DOM 容器
   */
  private createContainer(container: string | HTMLDivElement) {
    const { width, height } = this.options;
    const dom = typeof container === 'string' ? (document.getElementById(container) as HTMLDivElement) : container;
    dom.style.position || (dom.style.position = 'relative');
    if (width) {
      dom.style.width || (dom.style.width = `${width}px`);
    }
    if (height) {
      dom.style.height || (dom.style.height = `${height}px`);
    }

    return dom;
  }

  /**
   * 创建 map 容器
   */
  private createMap() {
    const mapConfig = this.options.map ? this.options.map : DEFAULT_OPTIONS.map;
    const { type, ...config } = mapConfig;

    return type === BaseMapType.Amap ? new GaodeMap(config) : new Mapbox(config);
  }

  /**
   * 创建 scene 实例
   */
  private createScene() {
    const { logo } = this.options;
    const logoConfig = isBoolean(logo)
      ? { logoVisible: logo }
      : { logoVisible: logo?.visible, logoPosition: logo?.position };
    const sceneConfig = Object.assign(
      {
        // animate,
        // fitBoundsOptions,
        // pickBufferScale,
        // enableMultiPassRenderer,
        // passes,
        // antialias,
        // preserveDrawingBuffer,
      },
      logoConfig
    );
    const map = this.createMap();

    const scene = new Scene({
      id: this.container,
      map: map,
      ...sceneConfig,
    });

    return scene;
  }

  /**
   * 创建 source 实例
   */
  protected createSource() {
    const { data, ...sourceCFG } = this.options.source;
    const source = new Source(data, sourceCFG);
    return source;
  }

  /**
   * 创建图层
   */
  protected abstract createLayers(source: Source): LayerGroup;

  /**
   * 更新图层
   */
  protected abstract updateLayers(options: Partial<O>): void;

  /**
   * 创建数据标签图层
   */
  protected createLabelLayer(source: Source, label: ILabelOptions): LabelLayerWrapper {
    const labelLayerWrapper = new LabelLayerWrapper({ name: 'labelLayer', source, ...label });
    return labelLayerWrapper;
  }

  /**
   * 渲染
   */
  public render() {
    if (this.inited) {
      this.updateLayers(this.options);
      // this.scene.render();
      this.initControls();
      this.initTooltip();
    } else {
      const layerGroup = this.createLayers(this.source);
      if (this.scene['sceneService'].loaded) {
        this.sceneLoaded = true;
        this.layersLoaded && this.emit('loaded');
      } else {
        // TODO: once
        this.scene.on('loaded', () => {
          this.sceneLoaded = true;
          this.layersLoaded && this.emit('loaded');
        });
      }
      if (layerGroup.isEmpty()) {
        this.layersLoaded = true;
      } else {
        layerGroup.once('inited-all', () => {
          this.layersLoaded = true;
          this.sceneLoaded && this.emit('loaded');
        });
      }
      layerGroup.addTo(this.scene);
      this.layerGroup = layerGroup;
    }
    this.once('loaded', () => {
      this.initControls();
      this.initTooltip();
    });
  }

  /**
   * 注册静态资源
   */
  private registerResources() {
    if (IMAGES_CACHE.size) {
      IMAGES_CACHE.forEach((img, id) => {
        this.scene.addImage(id, img);
      });
    }
    if (FONT_FACE_CACHE.size) {
      FONT_FACE_CACHE.forEach((fontPath, fontFamily) => {
        this.scene.addFontFace(fontFamily, fontPath);
      });
    }
    if (ICON_FONT_CACHE.size) {
      ICON_FONT_CACHE.forEach((name, fontUnicode) => {
        this.scene.addIconFont(fontUnicode, name);
      });
    }
  }

  /**
   * 更新: 更新配置且重新渲染
   */
  public update(options: Partial<O>) {
    this.updateOption(options);
    this.render();
  }

  /**
   * 更新: 更新配置
   */
  public updateOption(options: Partial<O>) {
    this.options = deepAssign({}, this.options, options);
  }

  /**
   * 更新: 更新数据
   */
  public changeData(data: any, cfg?: ISourceCFG) {
    // TODO: deepAssign old cfg
    this.source.setData(data, cfg);
  }

  /**
   * 修改容器大小
   */
  public changeSize(width: number, height: number) {
    if (this.options.width === width && this.options.height === height) return;
    this.container.style.width = `${width}px`;
    this.container.style.height = `${height}px`;
    this.options = Object.assign(this.options, { width, height });
  }

  /**
   * 自定义事件: 事件触发
   */
  protected emit(name: string, ...args: any[]) {
    this.eventEmitter.emit(name, ...args);
  }

  /**
   * 事件代理: 绑定事件
   */
  public on(name: string, callback: (...args: any[]) => void) {
    this.proxyEventHander('on', name, callback);
  }

  /**
   * 事件代理: 绑定一次事件
   */
  public once(name: string, callback: (...args: any[]) => void) {
    this.proxyEventHander('once', name, callback);
  }

  /**
   * 事件代理: 解绑事件
   */
  public off(name: string, callback: (...args: any[]) => void) {
    this.proxyEventHander('off', name, callback);
  }

  /**
   * 事件代理: 事件处理
   */
  private proxyEventHander(type: 'on' | 'off' | 'once', name: string, callback: (...args: any[]) => void) {
    const sceneEvent = SceneEventList.find((event) => event.adaptation === name);
    if (sceneEvent) {
      this.scene[type](sceneEvent.original, callback);
    } else if (MapEventList.indexOf(name) !== -1) {
      this.scene[type](name, callback);
    } else if (name.includes('Layer:')) {
      const [module, eventName] = name.split(':');
      const hasEventEmitter = this[module] && this[module][type];
      if (hasEventEmitter && LayerEventList.indexOf(eventName) !== -1) {
        this[module][type](eventName, callback);
      } else {
        throw new Error(`No event name "${name}"`);
      }
    } else {
      this.eventEmitter[type](name, callback);
    }
  }

  /**
   * 获取 scene 实例
   */
  public getScene(): Scene {
    return this.scene;
  }

  /**
   * 获取 map 实例
   */
  public getMap(): MapboxInstance | AMapInstance | unknown {
    if (this.options.map?.type === BaseMapType.Amap) {
      return this.scene.map as AMapInstance;
    } else if (this.options.map?.type === BaseMapType.Mapbox) {
      return this.scene.map as MapboxInstance;
    } else {
      return this.scene.map;
    }
  }

  /**
   * 添加图层
   */
  public addLayer(layer: ILayer) {
    this.scene.addLayer(layer);
  }

  /**
   * 获取所有图层
   */
  public getLayes(): ILayer[] {
    return this.scene.getLayers();
  }

  /**
   * 根据图层名称获取图层
   */
  public getLayerByName(name: string): ILayer | undefined {
    return this.scene.getLayerByName(name);
  }

  /**
   * 移除图层
   */
  public removeLayer(layer: ILayer) {
    this.scene.removeLayer(layer);
  }

  /**
   * 移除容器内所有的图层
   */
  public removeAllLayer() {
    this.scene.removeAllLayer();
  }

  /**
   * 初始化控件
   */
  private initControls() {
    const { zoom, scale, layerMenu, legend } = this.options;
    scale ? this.addScaleControl(scale) : this.removeScaleControl();
    zoom ? this.addZoomControl(zoom) : this.removeZoomControl();
    layerMenu ? this.addLayerMenuControl(layerMenu) : this.removeLayerMenuControl();
    legend ? this.addLegendControl(legend) : this.removeLegendControl();
  }

  /**
   * 添加 zoom 控件
   */
  public addZoomControl(options: IZoomControlOptions) {
    this.removeZoomControl();
    this.zoomControl = new Zoom(options);
    this.scene.addControl(this.zoomControl);
  }

  /**
   * 移除 zoom 控件
   */
  public removeZoomControl() {
    if (this.zoomControl) {
      this.zoomControl.remove();
      this.zoomControl = undefined;
    }
  }

  /**
   * 添加 scale 控件
   */
  public addScaleControl(options: IScaleControlOptions) {
    this.removeScaleControl();
    this.scaleControl = new Scale(options);
    this.scene.addControl(this.scaleControl);
  }

  /**
   * 移除 scale 控件
   */
  public removeScaleControl() {
    if (this.scaleControl) {
      this.scaleControl.remove();
      this.scaleControl = undefined;
    }
  }

  /**
   * 添加 layerMenu 控件
   */
  public addLayerMenuControl(options: ILayerMenuControlOptions) {
    this.removeLayerMenuControl();
    const baseLayers = {};
    const overlayers = {};
    this.layerGroup.getLayers().forEach((layer) => {
      overlayers[layer.name] = layer;
    });
    this.layerMenuControl = new Layers(Object.assign({}, options, { baseLayers, overlayers }));
    this.scene.addControl(this.layerMenuControl);
  }

  /**
   * 移除 layerMenu 控件
   */
  public removeLayerMenuControl() {
    if (this.layerMenuControl) {
      this.layerMenuControl.remove();
      this.layerMenuControl = undefined;
    }
  }

  /**
   * 添加 legend 控件
   */
  public addLegendControl(options: ILegendOptions) {
    this.removeLegendControl();
    const legendControlOptions = Object.assign({}, { title: '', items: [] }, options);
    this.legendControl = new Legend(legendControlOptions);
    this.scene.addControl(this.legendControl);
  }

  /**
   * 移除 legend 控件
   */
  public removeLegendControl() {
    if (this.legendControl) {
      this.legendControl.remove();
      this.legendControl = undefined;
    }
  }

  /**
   * 初始化 tooltip
   */
  private initTooltip() {
    if (this.tooltip) {
      this.tooltip.destroy();
    }
    const { tooltip } = this.options;
    if (tooltip) {
      this.tooltip = new Tooltip(this.scene, this.interactionLayers, tooltip);
      this.tooltip.on('*', (event: IEvent) => this.emit(event.type, event));
    }
  }

  /**
   * 导出地图图片
   */
  public exportPng(type?: 'png' | 'jpg'): string {
    return this.scene.exportPng(type);
  }

  /**
   * 销毁
   */
  public destroy() {
    // TODO: 清空已经绑定的事件
    this.removeScaleControl();
    this.removeZoomControl();
    this.removeLayerMenuControl();
    this.removeLegendControl();
    this.tooltip?.destroy();
    this.scene.destroy();
  }
}
