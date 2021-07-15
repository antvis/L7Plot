import { PositionName } from '@antv/l7-core';
import { LegendCustomContent } from '@antv/l7plot-component';
import { ILegendItems } from '../component/legend';

/**
 * LegendControl
 */
export interface ILegendOptions {
  title?: string;
  items?: ILegendItems[];
  position?: PositionName;
  className?: string;
  customContent?: LegendCustomContent;
  domStyles?: Record<string, any>;
}
