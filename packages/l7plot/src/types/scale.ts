import { PositionType } from '@antv/l7-core';

/**
 * ScaleControl
 */
export interface IScaleControlOption {
  position: PositionType;
  maxWidth: number;
  metric: boolean;
  updateWhenIdle: boolean;
  imperial: boolean;
}
