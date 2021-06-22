import { PositionType } from '@antv/l7-core';

/**
 * LayerMenuControl
 */
export interface ILayerMenuControlOption {
  position: PositionType;
  collapsed: boolean;
  autoZIndex: boolean;
  hideSingleBase: boolean;
  sortLayers: boolean;
  sortFunction: (...args: any[]) => any;
}
