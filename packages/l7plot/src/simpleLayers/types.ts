import { DotLayerOptions } from '../layers/dot-layer';
export type ISimpleData = any[];
export interface ISimpleParams extends DotLayerOptions {
  [key: string]: any;
}
