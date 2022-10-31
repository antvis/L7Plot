import { PositionType, PositionName } from '@antv/l7-core';

export { PositionType, PositionName };

/**
 * ZoomControl
 */
export type ZoomControlOptions = {
  position?: PositionName;
  zoomInText?: string;
  zoomInTitle?: string;
  zoomOutText?: string;
  zoomOutTitle?: string;
};

/**
 * ScaleControl
 */
export type ScaleControlOptions = {
  position?: PositionName;
  maxWidth?: number;
  metric?: boolean;
  updateWhenIdle?: boolean;
  imperial?: boolean;
};

/**
 * LayerMenuControl
 */
// TODO: 类型更新
export type LayerMenuControlOptions = {
  position?: PositionName;
  collapsed?: boolean;
  autoZIndex?: boolean;
  hideSingleBase?: boolean;
  sortLayers?: boolean;
  sortFunction?: (...args: any[]) => any;
};
