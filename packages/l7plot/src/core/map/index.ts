import { Scene } from '@antv/l7-scene';
import { Mapbox, GaodeMap } from '@antv/l7-maps';
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
import { ISourceCFG } from '@antv/l7-core';

const DEFAULT_OPTIONS = {
  map: { type: BaseMapType.Amap },
  logo: true,
};

export abstract class MapWrapper<O extends IMapOptions> extends EventEmitter {
  /**
   * 默认的 options 配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;
  /**
   * 地图类型
   */
  static MapType = MapType;
  /**
   * map 类型名称
   */
  public abstract readonly type: MapType | string;
  /**
   * 初始化状态
   */
  public inited = false;
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
    super();
    this.container = container;

    this.options = deepAssign({}, this.getDefaultOptions(), options);

    this.scene = this.createScene();
    this.source = this.createSource();

    // this.bindEvents();
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
      this.scene.render();
    } else {
      const layerGroup = this.createInternalLayers(this.source);
      layerGroup.addTo(this.scene);
      this.layerGroups.push(layerGroup);
    }
    this.initControls();
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
   * 绑定代理所有 L7 的事件
   */
  private bindEvents() {
    // this.scene.on('*', (e: Event) => {
    //   if (e?.type) {
    //     this.emit(e.type, e);
    //   }
    // });
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
   * 获取图层组
   */
  public getLayerGroups(): LayerGroup[] {
    return this.layerGroups;
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
    // this.off();
    this.scene.destroy();
  }
}
