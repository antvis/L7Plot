import { uniqueId } from '@antv/util';
import EventEmitter from '@antv/event-emitter';
import { Scene, IPlotLayer } from '../../types';

export interface LayerGroupOption {
  name?: string;
}

export class LayerGroup extends EventEmitter {
  /**
   * 图层组名称
   */
  public name: string;
  /**
   * 子图层
   */
  public layers: IPlotLayer[];
  /**
   * 地图容器
   */
  public scene: Scene | undefined;

  constructor(layers: IPlotLayer[] = [], option: LayerGroupOption = {}) {
    super();
    this.name = option.name ? option.name : uniqueId('layerGroup');
    this.layers = layers;
  }

  /**
   * 图层组添加到地图上
   */
  addTo(scene: Scene) {
    this.scene = scene;
    let layerIndex = 0;
    const layerLength = this.layers.length;
    this.layers.forEach((layer) => {
      layer.once('inited', (e) => {
        layerIndex++;
        this.emit('inited', e);
        if (layerIndex === layerLength) {
          this.emit('inited-all');
        }
      });
      layer.addTo(scene);
    });
  }

  /**
   * 图层组是否有该图层
   */
  hasLayer(layer: IPlotLayer): boolean {
    return this.layers.some((itemLayer) => itemLayer === layer);
  }

  /**
   * 增加图层
   */
  public addLayer(layer: IPlotLayer) {
    // TODO: duplicate layer
    this.layers.push(layer);
    if (this.scene) {
      layer.once('inited', (e) => this.emit('inited', e));
      layer.addTo(this.scene);
    }
  }

  /**
   * 移除 layer 图层
   */
  public removeLayer(layer: IPlotLayer): boolean {
    const layerIndex = this.layers.findIndex((itemLayer) => itemLayer === layer);
    if (layerIndex === -1) return false;
    this.layers.splice(layerIndex, 1);
    if (this.scene) {
      layer.remove(this.scene);
    }
    return true;
  }

  /**
   * 获取所有的地图图层
   */
  public getLayers(): IPlotLayer[] {
    return this.layers;
  }

  /**
   * 获取所有的带交互图层
   */
  public getInteractionLayers(): IPlotLayer[] {
    return this.layers.filter(({ interaction }) => interaction);
  }

  /**
   * 根据图层 ID 获取图层对象
   */
  public getLayer(id: string): IPlotLayer | undefined {
    return this.layers.find(({ layer }) => layer.id === id);
  }

  /**
   * 根据图层 name 获取图层对象
   */
  public getLayerByName(name: string): IPlotLayer | undefined {
    return this.layers.find((itemLayer) => itemLayer.name === name);
  }

  /**
   * 移除所有的图层对象
   */
  public removeAllLayer() {
    this.layers.forEach((layer) => {
      if (this.scene) {
        layer.remove(this.scene);
      }
    });
    this.layers = [];
  }

  /**
   * 是否图层组为空
   */
  public isEmpty() {
    return this.layers.length === 0;
  }
}
