import { SourceOptions } from './attr';
import { ILayer, LayerBlend, Scene, ISource, ILegend } from './common';

export interface ILayerGroup {
  name: string;

  addTo(scene: Scene): void;
  remove(): void;

  hasLayer(layer: string | ICoreLayer): boolean;
  addLayer(layer: ICoreLayer): void;
  removeLayer(layer: string | ICoreLayer): void;
  getLayers(): ICoreLayer[];
  getLayer(id: string): ICoreLayer | undefined;
  getLayerByName(name: string): ICoreLayer | undefined;
  removeAllLayer(): void;
  isEmpty(): boolean;

  setZIndex(zIndex: number): void;

  destroy(): void;

  on(name: string, callback: (...args: any[]) => void): this;
  once(name: string, callback: (...args: any[]) => void): this;
  off(name: string, callback: (...args: any[]) => void): this;
}

/**
 * 图层的基础接口
 */
interface IBaseLayer {
  options: Record<string, any>;
  name: string;
  id: string;
  type: string;
  isComposite: boolean;

  addTo(scene: Scene): void;
  remove(): void;

  update(options: unknown, autoRender?: boolean): void;
  updateOption(options: unknown): void;

  changeData(data: SourceOptions): void;
  render(): void;

  show(): void;
  hide(): void;
  toggleVisible(): void;
  isVisible(): boolean;

  setIndex(zIndex: number): void;
  setMinZoom(minZoom: number): void;
  setMaxZoom(maxZoom: number): void;
  setBlend(blend: LayerBlend): void;

  fitBounds(fitBoundsOptions?: unknown): void;
  getLegend(name: string): ILegend;
  getLegendItems(type: string): Record<string, any>[];

  boxSelect(bounds: [number, number, number, number], callback: (...args: any[]) => void): void;

  destroy(): void;

  on(name: string, callback: (...args: any[]) => void, once?: boolean): this;
  once(name: string, callback: (...args: any[]) => void): this;
  off(name: string, callback: (...args: any[]) => void): this;
}

/**
 * 核心图层的基类接口
 */
export interface ICoreLayer extends IBaseLayer {
  interaction: boolean;

  layer: ILayer;
  inited: boolean;
  source: ISource;

  setSource(source: ISource): void;
  getSource(): ISource;
}

/**
 * 复合图层的基类接口
 */
export interface ICompositeLayer extends IBaseLayer {
  subLayers: ILayerGroup;

  getColorLegendItems(): Record<string, any>[];

  getInteractionSubLayers(): ICoreLayer[];
}
