import { PositionType, PositionName } from '@antv/l7-core';

export { PositionType };

/**
 * ZoomControl
 */
export interface IZoomControlOption {
  position?: PositionName;
  zoomInText?: string;
  zoomInTitle?: string;
  zoomOutText?: string;
  zoomOutTitle?: string;
}

/**
 * ScaleControl
 */
export interface IScaleControlOption {
  position?: PositionName;
  maxWidth?: number;
  metric?: boolean;
  updateWhenIdle?: boolean;
  imperial?: boolean;
}

/**
 * LayerMenuControl
 */
export interface ILayerMenuControlOption {
  position?: PositionName;
  collapsed?: boolean;
  autoZIndex?: boolean;
  hideSingleBase?: boolean;
  sortLayers?: boolean;
  sortFunction?: (...args: any[]) => any;
}
