import { PositionType, PositionName } from '@antv/l7-core';

export { PositionType };

/**
 * ZoomControl
 */
export interface IZoomControlOptions {
  position?: PositionName;
  zoomInText?: string;
  zoomInTitle?: string;
  zoomOutText?: string;
  zoomOutTitle?: string;
}

/**
 * ScaleControl
 */
export interface IScaleControlOptions {
  position?: PositionName;
  maxWidth?: number;
  metric?: boolean;
  updateWhenIdle?: boolean;
  imperial?: boolean;
}

/**
 * LayerMenuControl
 */
export interface ILayerMenuControlOptions {
  position?: PositionName;
  collapsed?: boolean;
  autoZIndex?: boolean;
  hideSingleBase?: boolean;
  sortLayers?: boolean;
  sortFunction?: (...args: any[]) => any;
}
