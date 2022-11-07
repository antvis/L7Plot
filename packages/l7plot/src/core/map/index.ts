import { Scene } from '@antv/l7-scene';
import { Mapbox, GaodeMap } from '@antv/l7-maps';
import { Scale, Zoom } from '@antv/l7-component';
import EventEmitter from '@antv/event-emitter';
import { isObject, isBoolean, isUndefined, isEqual } from '@antv/util';
import { Tooltip } from '../../component/tooltip';
import { Legend, LegendItem } from '../../component/legend';
import { deepAssign } from '../../utils';
import {
  BaseMapType,
  MapOptions,
  AMapInstance,
  MapboxInstance,
  ZoomControlOptions,
  LayerMenuControlOptions,
  ScaleControlOptions,
  LegendOptions,
  Event,
  IPlotLayer,
  UpdateMapConfig,
  Bounds,
  MapStatusOptions,
} from '../../types';
import { LayerGroup } from '../layer/layer-group';
import { LayerEventList, MapEventList, SceneEventList } from './constants';
import { FONT_FACE_CACHE, ICON_FONT_CACHE, IMAGES_CACHE } from './register';
import { getTheme } from '../../theme';
import { createTheme } from '../../theme/util';

const DEFAULT_OPTIONS: Partial<MapOptions> = {
  map: { type: BaseMapType.Amap },
  logo: true,
};

export abstract class Map<O extends MapOptions> extends EventEmitter {
  /**
   * 默认的 options 配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;
  /**
   * 是否初始化成功
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
   * 是否场景与所有图层加载完成
   */
  public loaded = false;
  /**
   * map 的 schema 配置
   */
  public options: O;
  /**
   * map 上一次的 schema 配置
   */
  protected lastOptions: O;
  /**
   * map 绘制的 dom
   */
  public container!: HTMLDivElement;
  /**
   * scene 实例
   */
  public scene!: Scene;
  /**
   * 图层组
   */
  public layerGroup = new LayerGroup();
  /**
   * 主题配置
   */
  protected theme!: Record<string, any>;
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
  // public layerMenuControl: Layers | undefined;
  /**
   * legend 图例 Control
   */
  public legendControl: Legend | undefined;
  /**
   * tooltip 悬浮提示
   */
  public tooltip: Tooltip | undefined;

  constructor(options: O) {
    super();
    this.options = deepAssign({}, this.getDefaultOptions(), options);
    this.lastOptions = this.options;
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<MapOptions> {
    return Map.DefaultOptions;
  }

  /**
   * 创建 DOM 容器
   */
  protected createContainer(container: string | HTMLDivElement) {
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
   * 注册主题
   */
  protected createTheme() {
    const theme = isObject(this.options.theme)
      ? deepAssign({}, getTheme('default'), createTheme(this.options.theme))
      : getTheme(this.options.theme);
    return theme;
  }

  /**
   * 创建 map 容器
   */
  protected createMap() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const mapConfig = this.options.map ? this.options.map : DEFAULT_OPTIONS.map!;
    const { type, ...config } = mapConfig;
    const options = Object.assign({ style: this.theme['mapStyle'] }, config);

    return type === BaseMapType.Amap ? new GaodeMap(options) : new Mapbox(options);
  }

  /**
   * 创建 scene 实例
   */
  protected createScene() {
    const { logo, antialias, preserveDrawingBuffer } = this.options;
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
        antialias,
        preserveDrawingBuffer,
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
   * 渲染
   */
  public abstract render(): void;

  /**
   * 注册静态资源
   */
  protected registerResources() {
    if (IMAGES_CACHE.size) {
      IMAGES_CACHE.forEach((img, id) => {
        !this.scene.hasImage(id) && this.scene.addImage(id, img);
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
    if (options.map && !isEqual(this.lastOptions.map, this.options.map)) {
      this.updateMap(options.map);
    }
    this.render();
    this.emit('update');
  }

  /**
   * 更新: 更新配置
   */
  public updateOption(options: Partial<O>) {
    this.lastOptions = this.options;
    this.options = deepAssign({}, this.options, options);
  }

  /**
   * 更新: 地图底图配置
   */
  public updateMap(updateMapConfig: UpdateMapConfig) {
    if (!this.scene) return;
    const { style, center, zoom, rotation, pitch } = updateMapConfig;

    if (!isUndefined(pitch)) {
      this.scene.setPitch(pitch);
    }

    if (!isUndefined(rotation)) {
      this.scene.setRotation(rotation);
    }

    if (style && style !== this.lastOptions.map?.style) {
      this.scene.setMapStyle(style);
    }

    if (zoom && center) {
      this.scene.setZoomAndCenter(zoom, center);
    }
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
   * 事件代理: 绑定事件
   */
  public on(name: string, callback: (...args: any[]) => void, realOnce?: boolean) {
    this.proxyEventHander('on', name, callback, realOnce);
    return this;
  }

  /**
   * 事件代理: 绑定一次事件
   */
  public once(name: string, callback: (...args: any[]) => void) {
    this.proxyEventHander('once', name, callback);
    return this;
  }

  /**
   * 事件代理: 解绑事件
   */
  public off(name: string, callback: (...args: any[]) => void) {
    this.proxyEventHander('off', name, callback);
    return this;
  }

  /**
   * 事件代理: 事件处理
   */
  private proxyEventHander(
    type: 'on' | 'off' | 'once',
    name: string,
    callback: (...args: any[]) => void,
    realOnce?: boolean
  ) {
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
      super[type](name, callback, realOnce);
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
  public addLayer(layer: IPlotLayer) {
    this.layerGroup.addLayer(layer);
  }

  /**
   * 获取所有图层
   *  @deprecate
   */
  public getLayes(): IPlotLayer[] {
    console.warn('Replace to use getLayers()');
    return this.getLayers();
  }

  /**
   * 获取所有图层
   */
  public getLayers(): IPlotLayer[] {
    return this.layerGroup.getLayers();
  }

  /**
   * 根据图层名称获取图层
   */
  public getLayerByName(name: string): IPlotLayer | undefined {
    return this.layerGroup.getLayerByName(name);
  }

  /**
   * 移除图层
   */
  public removeLayer(layer: IPlotLayer) {
    return this.layerGroup.removeLayer(layer);
  }

  /**
   * 移除内置所有的图层
   */
  public removeAllLayer() {
    this.layerGroup.removeAllLayer();
  }

  /**
   * 地图放大一级
   */
  public zoomIn() {
    this.scene.zoomIn();
  }

  /**
   * 地图缩小一级
   */
  public zoomOut() {
    this.scene.zoomOut();
  }

  /**
   * 设置地图倾角
   */
  public setPitch(pitch: number) {
    this.scene.setPitch(pitch);
  }

  /**
   * 设置地图缩放范围
   */
  public fitBounds(bound: Bounds) {
    this.scene.fitBounds(bound);
  }

  /**
   * 设置地图状态
   * 可用来关闭地图的一些交互操作
   */
  public setMapStatus(status: MapStatusOptions) {
    this.scene.setMapStatus(status);
  }

  /**
   * 设置场景的背景色
   */
  public setBgColor(color: string) {
    this.scene.setBgColor(color);
  }

  /**
   * 初始化组件
   */
  protected initComponents() {
    this.initControls();
    this.initTooltip();
  }

  /**
   * 更新化组件
   */
  protected updateComponents() {
    this.updateControls();
    this.initTooltip();
  }

  /**
   * 初始化控件
   */
  protected initControls() {
    const { zoom, scale, layerMenu, legend } = this.options;
    scale && this.addScaleControl(scale);
    zoom && this.addZoomControl(zoom);
    layerMenu && this.addLayerMenuControl(layerMenu);
    legend && this.addLegendControl(legend);
  }

  /**
   * 更新控件
   */
  protected updateControls() {
    const { zoom, scale, layerMenu, legend } = this.options;
    if (!isEqual(this.lastOptions.zoom, zoom)) {
      zoom ? this.updateZoomControl(zoom) : this.removeZoomControl();
    }
    if (!isEqual(this.lastOptions.scale, scale)) {
      scale ? this.updateScaleControl(scale) : this.removeScaleControl();
    }
    if (!isEqual(this.lastOptions.layerMenu, layerMenu)) {
      layerMenu ? this.updateLayerMenuControl(layerMenu) : this.removeLayerMenuControl();
    }
    if (!isEqual(this.lastOptions.legend, legend)) {
      legend ? this.updateLegendControl(legend) : this.removeLegendControl();
    }
  }

  /**
   * 添加 zoom 控件
   */
  public addZoomControl(options: ZoomControlOptions) {
    if (this.zoomControl) {
      return;
    }
    this.zoomControl = new Zoom(options);
    this.scene.addControl(this.zoomControl);
  }

  /**
   * 更新 zoom 控件
   */
  public updateZoomControl(options: ZoomControlOptions) {
    if (!this.zoomControl) {
      this.addZoomControl(options);
      return;
    }
    this.removeZoomControl();
    this.addZoomControl(options);
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
  public addScaleControl(options: ScaleControlOptions) {
    if (this.scaleControl) {
      return;
    }
    this.scaleControl = new Scale(options);
    this.scene.addControl(this.scaleControl);
  }

  /**
   * 更新 scale 控件
   */
  public updateScaleControl(options: ScaleControlOptions) {
    if (!this.scaleControl) {
      this.addScaleControl(options);
      return;
    }
    this.removeScaleControl();
    this.addScaleControl(options);
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
  public addLayerMenuControl(options: LayerMenuControlOptions) {
    // if (this.layerMenuControl) {
    //   return;
    // }
    const baseLayers = {};
    const overlayers = {};
    this.layerGroup.getLayers().forEach(({ name, layer }) => {
      overlayers[name] = layer;
    });
    // this.layerMenuControl = new Layers(Object.assign({}, options, { baseLayers, overlayers }));
    // this.scene.addControl(this.layerMenuControl);
  }

  /**
   * 更新 layerMenu 控件
   */
  public updateLayerMenuControl(options: LayerMenuControlOptions) {
    // if (!this.layerMenuControl) {
    //   this.addLayerMenuControl(options);
    //   return;
    // }
    this.removeLayerMenuControl();
    this.addLayerMenuControl(options);
  }

  /**
   * 移除 layerMenu 控件
   */
  public removeLayerMenuControl() {
    // if (this.layerMenuControl) {
    //   this.layerMenuControl.remove();
    //   this.layerMenuControl = undefined;
    // }
  }

  /**
   * 获取 legend 配置项
   * 由各图各自实现，不同的图 legend 可能不同
   */
  public getLegendOptions(): LegendOptions {
    return {};
  }

  /**
   * 添加 legend 控件
   */
  public addLegendControl(options: LegendOptions) {
    if (this.legendControl) {
      return;
    }
    const legendTheme = this.theme['components'].legend;
    const legendOptions: LegendOptions = deepAssign({}, this.getLegendOptions(), options);
    const { type, position, ...rest } = legendOptions;
    const items: LegendItem[] = [];
    if (type === 'category') {
      const options = deepAssign({}, { domStyles: legendTheme.category.domStyles }, rest);
      items.push({ type, options });
    } else if (type === 'continue') {
      const options = deepAssign({}, { domStyles: legendTheme.continue.domStyles }, rest);
      items.push({ type, options });
    }

    if (items.length) {
      this.legendControl = new Legend({ position, items });
      this.scene.addControl(this.legendControl);
    }
  }

  /**
   * 更新 legend 控件
   */
  public updateLegendControl(options: LegendOptions) {
    if (!this.legendControl) {
      this.addLegendControl(options);
      return;
    }
    this.removeLegendControl();
    this.addLegendControl(options);
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
  protected initTooltip() {
    if (this.tooltip) {
      this.tooltip.destroy();
    }
    const { tooltip } = this.options;
    if (tooltip) {
      const options = deepAssign({}, { domStyles: this.theme['components'].tooltip.domStyles }, tooltip);
      const interactionLayers = this.layerGroup.getInteractionLayers();
      this.tooltip = new Tooltip(this.scene, interactionLayers, options);
      this.tooltip.on('*', (event: Event) => this.emit(event.type, event));
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
    // TODO: 清空已经绑定其他的事件
    super.off('*');
    this.removeScaleControl();
    this.removeZoomControl();
    this.removeLayerMenuControl();
    this.removeLegendControl();
    this.tooltip?.destroy();
    this.scene.destroy();
  }
}
