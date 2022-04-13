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
