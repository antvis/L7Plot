import { Scene } from '@antv/l7';
export interface IIconDataItem {
  lng?: number;
  lat?: number;
  url?: string;
}

export type IIconData = IIconDataItem | IIconDataItem[];

export interface IIconOptionProps {
  scene: Scene;
  size?: number;
}
export interface IIconOptions {
  scene: Scene;
  size: number;
}
