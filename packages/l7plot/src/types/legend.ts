import { PositionName } from '@antv/l7-core';
import { CategoryLegendCustomContent, ContinueLegendCustomContent } from '@antv/l7plot-component';
import { ILegendItems } from '../component/legend';

/**
 * LegendControl
 */
export interface ILegendOptions {
  title?: string;
  items?: ILegendItems[];
  position?: PositionName;
  className?: string;
  customContent?: CategoryLegendCustomContent;
  domStyles?: Record<string, any>;
}

/**
 * ContinueLegendControl
 */
export interface IContinueLegendOptions {
  title?: string;
  min?: number;
  max?: number;
  colors?: string[];
  position?: PositionName;
  className?: string;
  customContent?: ContinueLegendCustomContent;
  domStyles?: Record<string, any>;
}
