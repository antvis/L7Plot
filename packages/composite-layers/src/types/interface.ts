import { SourceOptions } from './attr';
import { ILayer, Scene } from './common';

export interface ILayerGroup {
  name: string;

  addTo(scene: Scene): void;
  remove(): void;

  hasLayer(layer: string | ILayer): boolean;
  addLayer(layer: ILayer): void;
  removeLayer(layer: string | ILayer): void;
  getLayers(): ILayer[];
  getLayer(id: string): ILayer | undefined;
  getLayerByName(name: string): ILayer | undefined;
  removeAllLayer(): void;
  isEmpty(): boolean;

  setZIndex(zIndex: number): void;

  destroy(): void;

  on(name: string, callback: (...args: any[]) => void): this;
  once(name: string, callback: (...args: any[]) => void): this;
  off(name: string, callback: (...args: any[]) => void): this;
}

/**
 * 复合图层的基类接口
 */
export interface ICompositeLayer {
  name: string;
  type: string;

  addTo(scene: Scene): void;
  remove(): void;

  update<T>(options: T): void;
  updateOption<T>(options: T): void;

  changeData(data: SourceOptions): void;
  render(): void;

  show(): void;
  hide(): void;
  toggleVisible(): void;

  setIndex(zIndex: number): void;
  setMinZoom(minZoom: number): void;
  setMaxZoom(maxZoom: number): void;

  fitBounds(fitBoundsOptions?: unknown): void;
  getlegenditems(type: string): Record<string, any>[];
  getColorLegendItems(): Record<string, any>[];

  destroy(): void;

  on(name: string, callback: (...args: any[]) => void): this;
  once(name: string, callback: (...args: any[]) => void): this;
  off(name: string, callback: (...args: any[]) => void): this;
}
