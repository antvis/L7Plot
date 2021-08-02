import { PositionName } from '@antv/l7-core';
import {
  CategoryLegendCustomContent,
  ICategoryLegendListItem,
  ContinueLegendCustomContent,
} from '@antv/l7plot-component';

/**
 * LegendControl
 */
export interface ILegendOptions {
  position?: PositionName;
  category?: ICategoryLegendOptions;
  continue?: IContinueLegendOptions;
}

/**
 * CategoryLegend
 */
export interface ICategoryLegendOptions {
  title?: string;
  items?: ICategoryLegendListItem[];
  className?: string;
  customContent?: CategoryLegendCustomContent;
  domStyles?: Record<string, any>;
}

/**
 * ContinueLegend
 */
export interface IContinueLegendOptions {
  title?: string;
  min?: number;
  max?: number;
  colors?: string[];
  className?: string;
  customContent?: ContinueLegendCustomContent;
  domStyles?: Record<string, any>;
}
