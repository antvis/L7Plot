import { uniqueId } from '@antv/util';
import EventEmitter from '@antv/event-emitter';
import { Scene, ILayerGroup, ICoreLayer } from '../types';

export type LayerGroupOptions = {
  name?: string;
};

export class LayerGroup extends EventEmitter implements ILayerGroup {
  /**
   * 图层组名称
   */
  public name: string;
  /**
   * 子图层
   */
  private layerMap = new Map<string, ICoreLayer>();
  /**
   * 地图容器
   */
  private scene: Scene | undefined;

  constructor(layers: ICoreLayer[] = [], option: LayerGroupOptions = {}) {
    super();
    this.name = option.name ? option.name : uniqueId('layerGroup');
    for (let index = 0; index < layers.length; index++) {
      const layer = layers[index];
      this.addLayer(layer);
    }
  }

  /**
   * 图层组添加到地图上
   */
  public addTo(scene: Scene) {
    this.scene = scene;
    let layerIndex = 0;
    const layerLength = this.layerMap.size;
    for (const layer of this.layerMap.values()) {
      layer.once('inited', (e) => {
        layerIndex++;
        this.emit('inited-layer', e);
        if (layerIndex === layerLength) {
          this.emit('inited-layers');
        }
      });
      layer.addTo(scene);
    }
  }

  /**
   * 图层组从地图上移除
   */
  public remove() {
    if (this.scene) {
      this.getLayers().forEach((layer) => layer.remove());
    }
  }

  /**
   * 图层组是否有该图层
   */
  public hasLayer(layer: string | ICoreLayer): boolean {
    const layerId = typeof layer === 'string' ? layer : this.getLayerId(layer);
    return this.layerMap.has(layerId);
  }

  /**
   * 添加图层
   */
  public addLayer(layer: ICoreLayer) {
    const layerId = this.getLayerId(layer);

    this.layerMap.set(layerId, layer);

    if (this.scene) {
      layer.once('inited', (e) => this.emit('inited-layer', e));
      layer.addTo(this.scene);
    }
  }

  /**
   * 添加多个图层
   */
  public addLayers(layers: ICoreLayer[]) {
    layers.forEach((layer) => {
      this.addLayer(layer);
    });
  }

  /**
   * 根据图层 id 或图层实例移除 layer 图层
   */
  public removeLayer(layer: string | ICoreLayer): boolean {
    const layerId = typeof layer === 'string' ? layer : this.getLayerId(layer);
    const findLayer = this.layerMap.get(layerId);

    if (!findLayer) return false;

    this.layerMap.delete(layerId);
    if (this.scene) {
      findLayer.remove();
    }
    return true;
  }

  /**
   * 获取图层组所有的图层
   */
  public getLayers(): ICoreLayer[] {
    return Array.from(this.layerMap.values());
  }

  /**
   * 根据图层 ID 获取图层
   */
  public getLayer(id: string): ICoreLayer | undefined {
    return this.layerMap.get(id);
  }

  /**
   * 根据图层 name 获取图层
   */
  public getLayerByName(name: string): ICoreLayer | undefined {
    return this.getLayers().find((itemLayer) => itemLayer.name === name);
  }

  /**
   * 移除所有的图层对象
   */
  public removeAllLayer() {
    for (const layer of this.layerMap.values()) {
      if (this.scene) {
        layer.remove();
      }
    }
    this.layerMap.clear();
  }

  /**
   * 是否图层组为空
   */
  public isEmpty() {
    return this.layerMap.size === 0;
  }

  /**
   * 设置图层组所有图层 zIndex
   */
  public setZIndex(zIndex: number) {
    for (const layer of this.layerMap.values()) {
      layer.setIndex(zIndex);
    }
  }

  /**
   * 根据图层获取图层 ID
   */
  public getLayerId(layer: ICoreLayer) {
    return layer.id;
  }

  /**
   * 摧毁图层组
   */
  public destroy() {
    this.remove();
    this.off('*');
  }
}
