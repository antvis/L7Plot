import { Scene } from '@antv/l7-scene';
import { Mapbox, GaodeMap } from '@antv/l7-maps';
import { ILayer, ISourceCFG } from '@antv/l7-core';
import { Scale, Layers, Zoom } from '@antv/l7-component';
import EventEmitter from '@antv/event-emitter';
import { isBoolean } from '@antv/util';
import { deepAssign } from '../../utils';
import {
  MapType,
  BaseMapType,
  IMapOptions,
  MapboxglMap,
  AMapInstance,
  MapboxInstance,
  Source,
  IZoomControlOption,
  ILayerMenuControlOption,
  IScaleControlOption,
} from '../../types';
import { LayerGroup } from '../layer/layer-group';
import { LayerEventList, MapEventList, SceneEventList } from './constants';
import { FONT_FACE_CACHE, ICON_FONT_CACHE, IMAGES_CACHE } from './register';

const DEFAULT_OPTIONS = {
  map: { type: BaseMapType.Amap },
  logo: true,
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
   * 是否所有内置图层加载完成
   */
  public layersLoaded = false;
  /**
   * map 的 schema 配置
   */
  public options: O;
  /**
   * map 绘制的 dom
   */
  public readonly container: string | HTMLDivElement;
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
  public layerGroups: LayerGroup[] = [];
  /**
   * zoom 放大缩小 Control
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

  constructor(container: string | HTMLDivElement, options: O) {
    this.container = container;

    this.options = deepAssign({}, this.getDefaultOptions(), options);

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
  private createSource() {
    const { data, ...sourceCFG } = this.options.source;
    const source = new Source(data, sourceCFG);
    return source;
  }

  /**
   * 创建图层
   */
  // protected abstract createLayers(source: Source): LayerGroup;

  /**
   * 创建内置图层
   */
  protected abstract createInternalLayers(source: Source): LayerGroup;

  /**
   * 更新内置图层
   */
  protected abstract updateInternalLayers(options: Partial<O>);

  /**
   * 渲染
   */
  public render() {
    if (this.inited) {
      this.updateInternalLayers(this.options);
      // this.scene.render();
    } else {
      const layerGroup = this.createInternalLayers(this.source);
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
      this.layerGroups.push(layerGroup);
    }
    this.initControls();
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
   * 自定义事件: 事件触发
   */
  protected emit(name: string, ...args: any[]) {
    this.eventEmitter.emit(name, ...args);
  }

  /**
   * 事件代理: 绑定事件
   */
  public on(name: string, callback: (...args: any[]) => void) {
    this.eventHander('on', name, callback);
  }

  /**
   * 事件代理: 绑定一次事件
   */
  public once(name: string, callback: (...args: any[]) => void) {
    this.eventHander('once', name, callback);
  }

  /**
   * 事件代理: 解绑事件
   */
  public off(name: string, callback: (...args: any[]) => void) {
    this.eventHander('off', name, callback);
  }

  /**
   * 事件代理: 事件处理
   */
  private eventHander(type: 'on' | 'off' | 'once', name: string, callback: (...args: any[]) => void) {
    const sceneEvent = SceneEventList.find((event) => event.adaptation === name);
    if (sceneEvent) {
      this.scene[type](sceneEvent.original, callback);
    } else if (MapEventList.indexOf(name) !== -1) {
      this.scene[type](name, callback);
    } else if (name.includes(':')) {
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
    if (this.scene.map instanceof AMap.Map) {
      return this.scene.map;
    } else if (this.scene.map instanceof MapboxglMap) {
      return this.scene.map;
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
    return this.scene.removeAllLayer();
  }

  /**
   * 初始化控件
   */
  private initControls() {
    const { zoom, scale, layerMenu } = this.options;
    scale ? this.addScaleControl(scale) : this.removeScaleControl();
    zoom ? this.addZoomControl(zoom) : this.removeZoomControl();
    layerMenu ? this.addLayerMenuControl(layerMenu) : this.removeLayerMenuControl();
  }

  /**
   * 添加 zoom 控件
   */
  public addZoomControl(options: IZoomControlOption) {
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
  public addScaleControl(options: IScaleControlOption) {
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
  public addLayerMenuControl(options: ILayerMenuControlOption) {
    this.removeLayerMenuControl();
    const baseLayers = {};
    const overlayers = {};
    this.layerGroups.forEach((layerGroup) => {
      layerGroup.getLayers().forEach((layer) => (overlayers[layer.name] = layer));
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
   * 导出地图图片
   */
  public exportPng(type?: 'png' | 'jpg'): string {
    return this.scene.exportPng(type);
  }

  /**
   * 销毁
   */
  public destroy() {
    // 清空已经绑定的事件
    this.scene.destroy();
  }
}
